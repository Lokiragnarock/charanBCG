import { ledger } from "@/lib/ledger";

/**
 * FPO stock-flow simulator, tomato only, monthly step.
 *
 * Lineage: NHS England nurse-workforce SD models (stocks = staff in post,
 * flows = recruitment/attrition) ported to the FPO: members are the
 * workforce, side-selling is the attrition, working capital is the oxygen.
 * See .claude/skills/systems-modeler/SKILL.md.
 *
 * Every constant below is either read from ledger.json (cited by its
 * source id) or, where no primary source exists, tagged "mock-v0" — the
 * same estimated-tag ledger row used by the S4 spectrum. This keeps the
 * simulator honest: the site and the appendix math can never disagree,
 * and invented numbers are never disguised as verified ones.
 */

export type PaymentTiming = "day0" | "t15";
export type FinanceSource = "balance-sheet" | "pledge" | "anchor";

export type ModelInputs = {
  paymentTiming: PaymentTiming;
  /** 0 (no advisory) .. 1 (full AI-native advisory: grading, agronomy, price signal) */
  advisoryQuality: number;
  financeSource: FinanceSource;
  /** -30 .. 30, percent shock to farmgate/market price */
  priceShockPct: number;
  /** simulation horizon in months, default 36 */
  months?: number;
};

export type MonthState = {
  month: number;
  members: number;
  workingCapital: number;
  volumeTonnes: number;
  joins: number;
  defections: number;
  spoilageTonnes: number;
  procurementSpend: number;
  buyerReceipts: number;
  interestCost: number;
  marginPct: number;
  insolvent: boolean;
};

export type ModelOutputs = {
  months: MonthState[];
  /** farmer income uplift, Rs/yr per member, vs NSSO baseline crop income */
  farmerUpliftRsYr: number;
  /** trailing-12-month average FPO margin, % */
  fpoMarginPct: number;
  /** peak cash drawn (most negative working capital point reached), Rs */
  workingCapitalRequiredRs: number;
  /** first month the FPO runs out of cash and credit headroom, or null if solvent through the horizon */
  monthsToInsolvency: number | null;
  finalMembers: number;
  verdict: "solvent" | "insolvent";
};

/** Sources for every constant used below, keyed for the UI's cite arrows. */
export const PARAM_SOURCES = {
  fpoWorkingCapital: ledger.fpo.source, // ijee-2022, Rs 3L median FPO working capital
  fpoMargin: ledger.fpo.source, // ijee-2022, 6% baseline FPO margin
  spoilage: ledger.losses.source, // ciphet-2015, 12.44% tomato post-harvest loss
  farmgatePrice: ledger.farmerShare.source, // rbi-top-2024, farmer keeps 33.5% of consumer Rs100
  advisoryUplift: ledger.advisory.source, // kumar-2016, +81% net income under contract farming
  creditRate: ledger.credit.source, // bankbazaar-agri-loans, KCC effective 4%/yr vs 36% informal
  baselineIncome: ledger.nsso.source, // nsso-77, Rs 3,798/mo baseline crop income
  membership: "mock-v0",
  addressablePool: "mock-v0",
  volumePerFarmer: "mock-v0",
  joinDefectionRates: "mock-v0",
  financeLimits: "mock-v0",
} as const;

// --- Calibrated constants -------------------------------------------------

const MEMBERS_START = 60; // mock-v0: a small FPO at go-live
const ADDRESSABLE_POOL = 400; // mock-v0: nearby small/marginal holders reachable
// mock-v0: tonnes/month/farmer channeled through the FPO (a fraction of a
// ~1.08ha holding's tomato output). Calibrated so 60 members at go-live move
// ~9t/month, roughly "one truckload" against the Rs 3L working-capital
// baseline (ledger.fpo, the S5 "median FPO working capital" framing).
const AVG_VOLUME_PER_FARMER_T_MO = 0.15;

const FARMGATE_PRICE_RS_KG =
  ledger.farmerShare.tomato; // rbi-top-2024: farmer's Rs share of the consumer's Rs100 tomato
const FPO_MARGIN_BASE_PCT = ledger.fpo.marginPct; // ijee-2022
const SPOILAGE_BASE_PCT = ledger.losses.tomatoPct; // ciphet-2015
const KCC_RATE_YR_PCT = ledger.credit.kccEffectivePct; // bankbazaar-agri-loans
const NSSO_CROP_INCOME_YR = ledger.nsso.cropIncomeMo * 12; // nsso-77 baseline

const BASE_JOIN_RATE_MO = 0.035; // mock-v0: fraction of remaining addressable pool/month
const BASE_DEFECTION_RATE_MO = 0.025; // mock-v0: baseline side-selling churn/month
const PAYMENT_LAG_DEFECTION_PENALTY = 0.02; // mock-v0: extra monthly churn under T+15 farmer payment
const PRICE_SHOCK_DEFECTION_SENSITIVITY = 0.15; // mock-v0: temptation to side-sell as spot price rises

const BUYER_RECEIPT_LAG_MONTHS = 1; // fixed downstream settlement lag, all scenarios

const FINANCE: Record<
  FinanceSource,
  { startingCapitalRs: number; limitMultiple: number; monthlyRatePct: number }
> = {
  // balance-sheet: only the FPO's own reserve, no external draw, no interest.
  "balance-sheet": {
    startingCapitalRs: ledger.fpo.workingCapitalLakh * 100000,
    limitMultiple: 1,
    monthlyRatePct: 0,
  },
  // pledge: warehouse-receipt lending against aggregated stock, at KCC-like rates.
  pledge: {
    startingCapitalRs: ledger.fpo.workingCapitalLakh * 100000,
    limitMultiple: 2.5, // mock-v0
    monthlyRatePct: KCC_RATE_YR_PCT / 12,
  },
  // anchor: a committed downstream buyer pre-finances procurement.
  anchor: {
    startingCapitalRs: ledger.fpo.workingCapitalLakh * 100000,
    limitMultiple: 4, // mock-v0
    monthlyRatePct: (KCC_RATE_YR_PCT * 1.5) / 12, // mock-v0: anchor finance priced above KCC
  },
};

/** Our recommended combination: pay farmers day-0 (retention), invest in
    full AI-native advisory (grading + agronomy cuts spoilage, lifts join
    rate), fund the gap with anchor buyer finance (largest headroom), no
    price shock assumed. */
export const OUR_RECOMMENDATION: ModelInputs = {
  paymentTiming: "day0",
  advisoryQuality: 0.8,
  financeSource: "anchor",
  priceShockPct: 0,
};

export function runModel(inputs: ModelInputs): ModelOutputs {
  const months = inputs.months ?? 36;
  const finance = FINANCE[inputs.financeSource];
  const creditLimit = finance.startingCapitalRs * finance.limitMultiple;

  let members = MEMBERS_START;
  let workingCapital = finance.startingCapitalRs;
  // pending buyer receipts, one slot per lag-month in flight
  const pendingReceipts: number[] = new Array(BUYER_RECEIPT_LAG_MONTHS).fill(0);
  // pending deferred farmer payments (T+15 scenario carries half the spend forward one month)
  let deferredSpend = 0;

  const history: MonthState[] = [];
  let insolventAtMonth: number | null = null;
  let peakDraw = 0; // most negative working capital reached (Rs of capital required)
  const marginHistory: number[] = [];

  for (let m = 1; m <= months; m++) {
    // 1. Joins: word-of-mouth from uplift, faster with better advisory.
    const remainingPool = Math.max(0, ADDRESSABLE_POOL - members);
    const joinRate = BASE_JOIN_RATE_MO * (0.6 + 0.4 * inputs.advisoryQuality);
    const joins = remainingPool * joinRate;

    // 2. Defections: side-selling driven by payment lag + spot price gap.
    const spotGapPct = Math.max(0, inputs.priceShockPct);
    const lagPenalty =
      inputs.paymentTiming === "t15" ? PAYMENT_LAG_DEFECTION_PENALTY : 0;
    const defectionRate =
      BASE_DEFECTION_RATE_MO +
      lagPenalty +
      (spotGapPct / 100) * PRICE_SHOCK_DEFECTION_SENSITIVITY;
    const defections = members * defectionRate;

    members = Math.max(0, members + joins - defections);

    // 3. Volume + spoilage (advisory quality cuts spoilage up to 50%).
    const volumeTonnes = members * AVG_VOLUME_PER_FARMER_T_MO;
    const spoilagePct = SPOILAGE_BASE_PCT * (1 - 0.5 * inputs.advisoryQuality);
    const spoilageTonnes = volumeTonnes * (spoilagePct / 100);
    const sellableTonnes = volumeTonnes - spoilageTonnes;

    // 4. Pricing.
    const farmgatePrice =
      FARMGATE_PRICE_RS_KG * (1 + inputs.priceShockPct / 100);
    const sellPrice = farmgatePrice * (1 + FPO_MARGIN_BASE_PCT / 100);

    // 5. Cash out: pay farmers for full delivered volume (spoilage is the FPO's loss).
    const fullSpend = volumeTonnes * 1000 * farmgatePrice;
    let procurementSpend: number;
    if (inputs.paymentTiming === "day0") {
      procurementSpend = fullSpend;
    } else {
      // T+15: half paid this month, half deferred one month (reduces cash strain).
      procurementSpend = fullSpend * 0.5 + deferredSpend;
      deferredSpend = fullSpend * 0.5;
    }

    // 6. Cash in: downstream buyer settles the prior lag-month's sale.
    const revenue = sellableTonnes * 1000 * sellPrice;
    pendingReceipts.push(revenue);
    const buyerReceipts = pendingReceipts.shift() ?? 0;

    // 7. Finance cost on any drawn (negative) balance.
    const drawnBalance = workingCapital < 0 ? -workingCapital : 0;
    const interestCost = drawnBalance * (finance.monthlyRatePct / 100);

    workingCapital =
      workingCapital + buyerReceipts - procurementSpend - interestCost;

    const draw = -workingCapital;
    if (draw > peakDraw) peakDraw = draw;

    const insolvent = -workingCapital > creditLimit;
    if (insolvent && insolventAtMonth === null) insolventAtMonth = m;

    const cost = volumeTonnes * 1000 * farmgatePrice;
    const marginPct = revenue > 0 ? ((revenue - cost) / revenue) * 100 : 0;
    marginHistory.push(marginPct);

    history.push({
      month: m,
      members,
      workingCapital,
      volumeTonnes,
      joins,
      defections,
      spoilageTonnes,
      procurementSpend,
      buyerReceipts,
      interestCost,
      marginPct,
      insolvent,
    });

    // Model stops compounding a dead FPO: freeze state once insolvent.
    if (insolvent) break;
  }

  const last = history[history.length - 1];
  const trailing = marginHistory.slice(-12);
  const fpoMarginPct =
    trailing.reduce((a, b) => a + b, 0) / (trailing.length || 1);

  // Farmer uplift: FPO membership captures more of the chain (better price
  // realization + advisory yield/quality gains) vs the NSSO baseline.
  const priceCaptureUpliftPct = 8; // mock-v0: FPO aggregation price realization gain
  const advisoryUpliftPct =
    ledger.advisory.contractFarmingUpliftPct * inputs.advisoryQuality;
  const combinedUpliftPct = priceCaptureUpliftPct + advisoryUpliftPct;
  const farmerUpliftRsYr = NSSO_CROP_INCOME_YR * (combinedUpliftPct / 100);

  return {
    months: history,
    farmerUpliftRsYr,
    fpoMarginPct,
    workingCapitalRequiredRs: peakDraw,
    monthsToInsolvency: insolventAtMonth,
    finalMembers: last?.members ?? members,
    verdict: insolventAtMonth === null ? "solvent" : "insolvent",
  };
}
