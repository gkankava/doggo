import create from "zustand";

const store = (set) => ({
  notification: false,
  setLoading: (bool) => {
    set(() => ({
      loading: bool,
    }));
  },
});

export const appStateProvider = create(store);
