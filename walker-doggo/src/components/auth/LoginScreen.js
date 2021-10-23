import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";

import Form from "./Form";

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../../assets/logo/logo.png")}
        style={styles.logo}
      />
      <Form />
    </SafeAreaView>
  );
};

export default LoginScreen;

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 50,
  },
  logo: {
    width: width * 0.55,
    height: width * 0.55,
    marginTop: 50,
    marginBottom: 20,
  },
});
