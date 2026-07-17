import spectrumData from "@/data/spectrum.json";

export type GiStatus = "none" | "monetized" | "unmonetized-hill" | "unmonetized-local";

export type Cluster = {
  key: string;
  label: string;
  region: string;
  areaKHa: number;
  productionMnMt: number;
  yieldMtHa?: number;
  productionCagrPct?: number;
  marketSurplusLMt: number;
  marketSurplusNote?: string;
  marketSurplusFlag?: string;
  marketSurplusReconcileNote?: string;
  marketSurplusReconcileSource?: string;
  variety: string;
  giStatus: GiStatus;
  giNote: string;
  giPremiumPct?: number;
  competitionLabel: string;
  directSourcingPct?: number;
  inputMonopoly: boolean;
  postHarvestLossPct: number;
  postHarvestLossRange?: [number, number];
  postHarvestLossNote?: string;
  commissionRatePct?: number;
  ripeningCapacityMt?: number;
  ripeningCapacitySource?: string;
  portConnectivity: string;
  portConnectivitySource?: string;
  efficiencyScore: number;
  giHeadroomScore: number;
  delta: number;
  pick?: boolean;
  cons?: string[];
  source: string;
};

export const spectrum = spectrumData as {
  version: number;
  note: string;
  formula: string;
  constants: {
    ripeningPerKg: number;
    commissionAgentVolumeSharePctLow: number;
    commissionAgentVolumeSharePctHigh: number;
    note: string;
    source: string;
  };
  commissionRate: {
    tnPct: number;
    northPctLow: number;
    northPctHigh: number;
    note: string;
    source: string;
  };
  clusters: Cluster[];
};
