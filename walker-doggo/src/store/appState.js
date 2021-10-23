import create from "zustand";

const store = (set) => ({
  loading: false,
  setLoading: (bool) => {
    set(() => ({
      loading: bool,
    }));
  },
  drawerIsActive: false,
  toogleDrawer: () => {
    set((state) => ({
      drawerIsActive: !state.drawerIsActive,
    }));
  },
  setDrawerIsActive: (bool) => {
    set(() => ({ drawerIsActive: bool }));
  },
});

export const appStateProvider = create(store);
