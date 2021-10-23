import create from "zustand";
import { setTokenHeader } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const store = (set) => ({
  currentUser: {
    isAuthenticated: false,
    user: {
      verified: false,
    },
  },
  setCurrentUser: (isAuthenticated, user) => {
    set(() => ({
      currentUser: {
        isAuthenticated,
        user,
      },
    }));
  },
  logOut: async () => {
    try {
      await AsyncStorage.removeItem("jwtToken");
      setTokenHeader(false);
    } catch (error) {
      console.log(error);
    }
    set(() => ({
      currentUser: {
        isAuthenticated: false,
        user: null,
      },
    }));
  },
});
export const userProvider = create(store);
