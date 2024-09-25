import { create } from "zustand";

type PathnameHistoryState = {
  pathnameHistory: string[];
  actions: {
    pushPathname: (pathname: string) => void;
  };
};

const usePathnameHistoryState = create<PathnameHistoryState>()((set) => ({
  pathnameHistory: [],
  actions: {
    pushPathname: (pathname) =>
      set((state) => ({
        pathnameHistory: [...state.pathnameHistory, pathname],
      })),
  },
}));

export default usePathnameHistoryState;
