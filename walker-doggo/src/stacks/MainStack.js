import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import { appStateProvider } from "../store/appState";

import Hamburger from "../components/shared/header/Hamburger";
import HeaderBackButton from "../components/shared/header/HeaderBackButton";

import NC from "../services/NC";
import ServicesProvider from "../services/ServicesProvider";
import Drawer from "../components/shared/drawer/Drawer";
import MainScreen from "../components/main/MainScreen";
import History from "../components/main/History";
import Rating from "../components/main/Rating";
import Info from "../components/main/Info";
import Settings from "../components/main/Settings";
import OrderStack from "./OrderStack";

const MainStack = () => {
  const { drawerIsActive, setDrawerIsActive } = appStateProvider();
  return (
    <>
      <NC />
      <ServicesProvider />
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
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
          headerLeft: () => <HeaderBackButton />,
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerTitle: "",
            headerLeft: () => <Hamburger />,
          }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{
            headerTitle: "ისტორია",
            headerLeft: () => <HeaderBackButton />,
          }}
        />
        <Stack.Screen
          name="Rating"
          component={Rating}
          options={{
            headerTitle: "რეიტინგი",
            headerLeft: () => <HeaderBackButton />,
          }}
        />
        <Stack.Screen
          name="Info"
          component={Info}
          options={{
            headerTitle: "ჩემი ინფორმაცია",
            headerLeft: () => <HeaderBackButton />,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerTitle: "პარამეტრები",
            headerLeft: () => <HeaderBackButton />,
          }}
        />
        <Stack.Screen
          name="OrderStack"
          component={OrderStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Drawer
        modalVisible={drawerIsActive}
        setModalVisible={setDrawerIsActive}
      />
    </>
  );
};

export default MainStack;
