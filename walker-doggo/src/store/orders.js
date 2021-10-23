import create from "zustand";

const store = (set) => ({
  orders: [],
  setOrders: (list) => {
    set(() => ({
      orders: list,
    }));
  },
  asapOrders: [],
  setAsapOrders: (asapOrders) => {
    set(() => ({
      asapOrders,
    }));
  },
  activeOrder: false,
  setActiveOrder: (order) => {
    set(() => ({
      activeOrder: order,
    }));
  },
});

export const ordersProvider = create(store);
