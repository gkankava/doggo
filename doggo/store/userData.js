import create from "zustand";

const store = (set) => ({
  dogs: [],
  setDogs: (dogs) => {
    set(() => ({
      dogs: dogs,
    }));
  },
  cards: [],
  setCards: (cards) => {
    set(() => ({
      cards: cards,
    }));
  },
  addresses: [],
  setAddresses: (addresses) => {
    set(() => ({
      addresses,
    }));
  },
  walkOrders: [],
  setWalkOrders: (orders) => {
    set(() => ({
      walkOrders: orders,
    }));
  },
});

export const userDataProvider = create(store);
