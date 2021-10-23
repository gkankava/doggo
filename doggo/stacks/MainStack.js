import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NC from "../services/NC";

const Stack = createStackNavigator();

import { breedsProvider } from "../store/breeds";
import { fetchBreeds } from "../store/actions/breeds";

import MainScreen from "../components/main/MainScreen";
import FoodStack from "./FoodStack";
import WalkStack from "./WalkStack";
import DrawerStack from "./DrawerStack";

function auth() {
  const { setBreeds } = breedsProvider();
  useEffect(() => {
    fetchBreeds(setBreeds);
  }, []);
  return (
    <>
      <NC />
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ options: { headerShown: false } }}
      >
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Walk"
          component={WalkStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="FoodStack"
          component={FoodStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerStack"
          component={DrawerStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

export default auth;
