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

type SceneStore = {
  active: string;
  setActive: (id: string) => void;
};

export const useSceneStore = create<SceneStore>((set) => ({
  active: "s1",
  setActive: (id) => set({ active: id }),
}));
