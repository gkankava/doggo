if (__DEV__) {
  import("../ReactotronConfig").then(() => console.log("Reactotron Ready"));
}

import React from "react";
import { StatusBar, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";

import Toast from "react-native-toast-message";

import RequestPermissionsAsunc from "./services/RequestPermissionsAsunc";
import AppLoadingIndicator from "./components/shared/AppLoadingIndicator";
import Router from "./Router";

import { navigationRef } from "./RootNavigation";

import { startLocationUpdatesAsync } from "./services/background_tasks/_syncLocation";

export default function App() {
  React.useEffect(() => {
    startLocationUpdatesAsync();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView style={styles.container}>
        <Router />
        <AppLoadingIndicator />
      </SafeAreaView>
      <RequestPermissionsAsunc />
      <StatusBar
        barStyle="auto"
        translucent={false}
        backgroundColor="#4D9F72"
      />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}

const { height, width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: "white",
    position: "relative",
  },
});

//TASK MANAGER
import * as TaskManager from "expo-task-manager";
import { updateLocation } from "./store/actions/user";

TaskManager.defineTask("LOCATION_BACKGROUND_TASK", async ({ data, error }) => {
  if (error) {
    console.log("BACKGROUND_TASK task ERROR:", error);
    return;
  }
  if (data) {
    const currentUser = await Router.getCurrentUser();
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;
    updateLocation(currentUser, { latitude: lat, longitude: long });
  }
});
