import React from "react";
import { StyleSheet, Text } from "react-native";

const SectionTitle = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default SectionTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontWeight: "400",
    color: "#46596C",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});
