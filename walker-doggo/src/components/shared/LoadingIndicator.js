import React from "react";
import { StyleSheet, View, Dimensions, StatusBar } from "react-native";
import * as Progress from "react-native-progress";

const LoadingIndicator = () => {
  return (
    <View style={styles.loadingContainer}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <Progress.CircleSnail color={"#3CBF77"} size={70} thickness={2} />
    </View>
  );
};

export default LoadingIndicator;

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 100,
  },
});
