import create from "zustand";

const store = (set) => ({
  loading: false,
  setLoading: (bool) => {
    set(() => ({
      loading: bool,
    }));
  },
  isSignUpG: false,
  setIsSignUpG: (bool) => {
    set(() => ({
      isSignUp: bool,
    }));
  },
});

export const appStateProvider = create(store);
