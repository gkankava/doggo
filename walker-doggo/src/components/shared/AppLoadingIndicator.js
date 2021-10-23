import React from "react";
import { StyleSheet, View, Dimensions, StatusBar } from "react-native";
import * as Progress from "react-native-progress";

import { appStateProvider } from "../../store/appState";

const AppLoadingIndicator = () => {
  const { loading } = appStateProvider();

  return (
    <>
      {loading && (
        <View style={styles.loadingContainer}>
          <StatusBar
            barStyle="dark-content"
            translucent={true}
            backgroundColor="transparent"
          />
          <Progress.CircleSnail color={"#3CBF77"} size={70} thickness={4} />
        </View>
      )}
    </>
  );
};

export default AppLoadingIndicator;

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  loadingContainer: {
    height,
    width,
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 100,
  },
});
