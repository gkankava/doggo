import create from "zustand";

export const initialOrder = {
  service_type: null,
  walk_service_id: null,
  address: null,
  customer_id: null,
  walker_id: null,
  dog_id: null,
  card_id: null,
};

const store = (set) => ({
  order: initialOrder,
  setOrder: (orderDetails) => {
    set(() => ({
      order: orderDetails,
    }));
  },
  ssd: (id) => {
    set((state) => ({
      order: { ...state.order, dog_id: id },
    }));
  },
  walker: [],
  setWalker: (walker) => {
    set(() => ({
      walker,
    }));
  },
  walkers: [],
  setWalkers: (walkers) => {
    set(() => ({
      walkers,
    }));
  },
  activeOrder: false,
  setActiveOrder: (order) => {
    set(() => ({
      activeOrder: order,
    }));
  },
});

export const walkOrderProvider = create(store);
