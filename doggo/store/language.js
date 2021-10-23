import create from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const store = (set) => ({
  language: "ge",
  setLanguage: (lang) => {
    set(() => ({
      language: lang,
    }));
  },
});

export const languageProvider = create(store);
