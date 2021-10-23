import create from "zustand";

const store = (set) => ({
  walkServices: [],
  setWalkServices: (list) => {
    set(() => ({
      walkServices: list,
    }));
  },
});

export const walkServicesProvider = create(store);
