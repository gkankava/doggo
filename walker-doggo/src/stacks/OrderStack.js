import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import HeaderBackButton from "../components/shared/header/HeaderBackButton";

import OrderDetails from "../components/order/OrderDetails";
import MapView from "../components/order/MapView";

const OrderStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="OrderReview"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          headerShown: true,
          headerTitle: "შეკვეთის დეტალები",
          headerLeft: () => <HeaderBackButton />,
          headerStyle: {
            backgroundColor: "white",
            elevation: 0,
            shadowOpacity: 0,
            height: 80,
          },
          headerTintColor: "#3CBF77",
          headerTitleStyle: {
            color: "#3CBF77",
            alignSelf: "center",
            fontSize: 18,
            fontWeight: "500",
            marginRight: Platform.OS === "ios" ? 0 : 42,
          },
          headerLeftContainerStyle: { marginLeft: 20 },
        }}
      />
      <Stack.Screen name="MapView" component={MapView} />
    </Stack.Navigator>
  );
};

export default OrderStack;
