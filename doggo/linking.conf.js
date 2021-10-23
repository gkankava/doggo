export const linking = {
  prefixes: ["https://doggoapp.ge", "doggo://"],
  config: {
    screens: {
      FoodStack: {
        screens: {
          Order: "food/order",
        },
      },
      DrawerStack: {
        screens: {
          Info: {
            screens: {
              Payment: {
                path: "drawer/personal/payment",
              },
              NewAddress: {
                path: "drawer/personal/new-address",
              },
            },
          },
        },
      },
    },
  },
};
