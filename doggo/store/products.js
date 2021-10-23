import create from "zustand";

export const initialOrder = {
  delivery_date_one: null,
  products: [],
  delivery_address: null,
  card_id: null,
  has_discount: false,
};

const store = (set) => ({
  categories: [],
  setCategories: (list) => {
    set(() => ({
      categories: list,
    }));
  },
  products: [],
  setProducts: (list) => {
    set(() => ({
      products: list,
    }));
  },
  order: initialOrder,
  setOrder: (orderDetails) => {
    set(() => ({
      order: orderDetails,
    }));
  },
});

export const shopProvider = create(store);
