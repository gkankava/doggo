import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { languageProvider } from "../store/language";
import { pc } from "./content/personal";

import HeaderBackButton from "../components/shared/headers/HeaderBackButton";

import Info from "../components/personal/Info";
import Reset from "../components/personal/Reset";
import Mobile from "../components/personal/Mobile";
import PaymentInfo from "../components/personal/PaymentInfo";
import Address from "../components/personal/Address";
import NewAddress from "../components/personal/NewAddress";

const Stack = createStackNavigator();

const PersonalStack = () => {
  const { language } = languageProvider();
  const ln = pc[language];

  return (
    <>
      <Stack.Navigator
        initialRouteName="Info"
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
        <Stack.Screen name="Info" component={Info} options={{ title: "" }} />
        <Stack.Screen
          name="Reset"
          component={Reset}
          options={{ title: ln.reset }}
        />
        <Stack.Screen
          name="Mob"
          component={Mobile}
          options={{ title: ln.mob }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentInfo}
          options={{ title: ln.payment }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{ title: ln.address }}
        />
        <Stack.Screen
          name="NewAddress"
          component={NewAddress}
          options={{ title: ln.newAddress }}
        />
      </Stack.Navigator>
    </>
  );
};

export default PersonalStack;
