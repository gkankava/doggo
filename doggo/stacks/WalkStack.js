import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { languageProvider } from "../store/language";
import { wc } from "./content/walk";

import HeaderBackButton from "../components/shared/headers/HeaderBackButton";

import WalkMainScreen from "../components/walk/WalkMainScreen";
import WalkOrder from "../components/walk/WalkOrder";
import WalkProgress from "../components/walk/WalkProgress";

const Stack = createStackNavigator();

const WalkStack = () => {
  const { language } = languageProvider();
  const ln = wc[language];
  return (
    <>
      <Stack.Navigator
        initialRouteName="WalkMainScreen"
        screenOptions={{
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
      >
        <Stack.Screen
          name="WalkMainScreen"
          component={WalkMainScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="WalkOrder"
          component={WalkOrder}
          options={{ title: ln.det }}
        />
        <Stack.Screen
          name="WalkProgress"
          component={WalkProgress}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default WalkStack;
