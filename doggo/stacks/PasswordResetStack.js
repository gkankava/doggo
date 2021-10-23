import React from "react";
import { Platform } from "react-native";
import { rc } from "./content/reset";
import { languageProvider } from "../store/language";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import EmailScreen from "../components/password-reset/EmailScreen";
import ConfirmationScreen from "../components/password-reset/ConfirmationScreen";
import NewPasswordScreen from "../components/password-reset/NewPasswordScreen";

import HeaderBackButton from "../components/shared/headers/HeaderBackButton";

function PasswordResetStack() {
  const { language } = languageProvider();
  const ln = rc[language];
  return (
    <>
      <Stack.Navigator
        initialRouteName="Email"
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
          },
          headerLeftContainerStyle: { marginLeft: 20 },
          headerLeft: (props) => <HeaderBackButton />,
        }}
      >
        <Stack.Screen
          name="Email"
          component={EmailScreen}
          options={{ title: ln.reset }}
        />
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
          options={{ title: ln.confirm }}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPasswordScreen}
          options={{ title: ln.new }}
        />
      </Stack.Navigator>
    </>
  );
}

export default PasswordResetStack;
