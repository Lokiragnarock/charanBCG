import ledgerData from "@/data/ledger.json";

export type SourceTag = "verified" | "reported" | "estimated";

export type Source = {
  title: string;
  url: string;
  year: number;
  tag: SourceTag;
};

export const ledger = ledgerData as typeof ledgerData;
export const sources: Record<string, Source> = ledgerData.sources as Record<
  string,
  Source
>;

export const tagEmoji: Record<SourceTag, string> = {
  verified: "🟢",
  reported: "🟡",
  estimated: "🔴",
};
