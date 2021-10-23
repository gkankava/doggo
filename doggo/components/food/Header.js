import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import Animated from "react-native-reanimated";

const height = Dimensions.get("screen").height;
// const width = Dimensions.get("screen").width;

const Header = ({ opacity, scale }) => {
  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/icons/zoomart.png")}
        style={[
          styles.image,
          { opacity, transform: [{ scaleY: scale, scaleX: scale }] },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: height * 0.4557 - 130,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  image: {
    width: "90%",
    resizeMode: "contain",
    // height: height * 0.11,
  },
});
