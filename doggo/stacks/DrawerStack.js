import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { dc } from "./content/drawer";
import { languageProvider } from "../store/language";

import Dogs from "../components/shared/drawer/Dogs";
import NewDog from "../components/shared/drawer/NewDog";
import Bookings from "../components/shared/drawer/Bookings";
import History from "../components/shared/drawer/History";
import PersonalStack from "./PersonalStack";
import Promos from "../components/shared/drawer/Promos";
import Refs from "../components/shared/drawer/Refs";
import Terms from "../components/shared/terms/Terms";

import HeaderBackButton from "../components/shared/headers/HeaderBackButton";

const Stack = createStackNavigator();

const DrawerStack = () => {
  const { language } = languageProvider();
  const ln = dc[language];

  return (
    <>
      <Stack.Navigator
        initialRouteName="Dogs"
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
          name="Dogs"
          component={Dogs}
          options={{ title: ln.dogs }}
        />
        <Stack.Screen
          name="NewDog"
          component={NewDog}
          options={{ title: ln.new }}
        />
        <Stack.Screen
          name="EditDog"
          component={NewDog}
          options={{ title: ln.edit }}
        />
        <Stack.Screen
          name="Info"
          component={PersonalStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{ title: ln.history }}
        />
        <Stack.Screen
          name="Promos"
          component={Promos}
          options={{ title: ln.promo }}
        />
        <Stack.Screen
          name="Refs"
          component={Refs}
          options={{ title: ln.refs }}
        />
        <Stack.Screen
          name="Bookings"
          component={Bookings}
          options={{ title: ln.bookings }}
        />
        <Stack.Screen
          name="Terms"
          component={Terms}
          options={{ title: ln.pp }}
        />
      </Stack.Navigator>
    </>
  );
};

export default DrawerStack;
