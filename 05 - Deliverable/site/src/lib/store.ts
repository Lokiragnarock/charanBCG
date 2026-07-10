import { create } from "zustand";

type CiteStore = {
  openId: string | null;
  open: (id: string) => void;
  close: () => void;
};

export const useCiteStore = create<CiteStore>((set) => ({
  openId: null,
  open: (id) => set({ openId: id }),
  close: () => set({ openId: null }),
}));
