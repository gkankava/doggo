import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { languageProvider } from "../../../store/language";

import HorizontalMenu from "./HorizontalMenu";

const History = () => {
  const { language } = languageProvider();

  return (
    <View style={styles.container}>
      <HorizontalMenu />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
});
