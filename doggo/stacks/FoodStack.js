import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { languageProvider } from "../store/language";
import { fc } from "./content/food";

import Food from "../components/food/Food";
import Date from "../components/food/Date";
import OrderDetails from "../components/food/OrderDetails";
import Confirmation from "../components/food/Confirmation";

import BtnBack from "../components/shared/buttons/BtnBack";
import HeaderBackButton from "../components/shared/headers/HeaderBackButton";

const Stack = createStackNavigator();

function FoodStack() {
  const { language } = languageProvider();
  const ln = fc[language];

  return (
    <>
      <Stack.Navigator initialRouteName="Food">
        <Stack.Screen
          name="Food"
          component={Food}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Date"
          component={Date}
          options={{
            title: ln.date,
            headerStyle: {
              backgroundColor: "white",
              height: 130,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: "#3CBF77",
            headerTitleStyle: {
              color: "#3CBF77",
              alignSelf: "center",
              marginRight: Platform.OS === "ios" ? 0 : 42,
              fontWeight: "400",
            },
            headerLeftContainerStyle: { marginLeft: 20 },
            headerLeft: (props) => <HeaderBackButton />,
          }}
        />
        <Stack.Screen
          name="Order"
          component={OrderDetails}
          options={{
            title: ln.details,
            headerStyle: {
              backgroundColor: "white",
              height: 130,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: "#3CBF77",
            headerTitleStyle: {
              color: "#3CBF77",
              alignSelf: "center",
              marginRight: Platform.OS === "ios" ? 0 : 42,
              fontWeight: "400",
            },
            headerLeftContainerStyle: { marginLeft: 20 },
            headerLeft: (props) => <HeaderBackButton />,
          }}
        />
        <Stack.Screen
          name="OrderConfirm"
          component={Confirmation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

export default FoodStack;
