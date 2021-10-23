import create from "zustand";

const store = (set) => ({
  breeds: [],
  setBreeds: (breeds) => {
    set(() => ({
      breeds,
    }));
  },
});

export const breedsProvider = create(store);
