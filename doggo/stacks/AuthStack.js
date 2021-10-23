import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import LoginScreen from "../components/auth/LoginScreen";
import SignUpScreen from "../components/auth/SignUpScreen";
import VerifyScreen from "../components/auth/VerifyScreen";
import PasswordResetStack from "./PasswordResetStack";

function AuthStack() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Reset" component={PasswordResetStack} />
      </Stack.Navigator>
    </>
  );
}

export default AuthStack;
