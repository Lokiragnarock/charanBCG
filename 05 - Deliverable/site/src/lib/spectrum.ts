import spectrumData from "@/data/spectrum.json";

export type Candidate = {
  key: string;
  label: string;
  tamCr: number;
  top3Pct: number;
  opening: number;
  farmerShare: number;
  score: number;
  top3: string[];
  source: string;
};

export const spectrum = spectrumData as {
  formula: string;
  note: string;
  candidates: Candidate[];
};
