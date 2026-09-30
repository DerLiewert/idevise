// src/stores/counter-store.ts
import { create } from "zustand";
import { createStore } from "zustand/vanilla";

export type SearchState = {
  type: "groups" | "specifications";
  value: string;
};

export type SearchActions = {
  setSearch: (payload: SearchState) => void;
  clearSearch: () => void;
};

export type SearchStore = SearchState & SearchActions;

export const defaultInitState: SearchState = {
  type: "groups",
  value: "",
};

// export const createCSearchStore = (
//   initState: SearchState = defaultInitState,
// ) => {
//   return createStore<SearchStore>()((set) => ({
//     ...initState,
//     setSearch: (payload) => set((state) => ({ ...state, ...payload })),
//     clearSearch: () => set(() => defaultInitState),
//   }));
// };

export const useSearchStore = create<SearchStore>((set) => ({
  ...defaultInitState,
  setSearch: (payload) => set((state) => ({ ...state, ...payload })),
  clearSearch: () => set(() => defaultInitState),
}));
