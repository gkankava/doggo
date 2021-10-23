import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { languageProvider } from "../../store/language";

const SwitchComp = ({ selected, setSelected }) => {
  const { language } = languageProvider();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.switchItem,
          { backgroundColor: selected === 0 ? "#43BE79" : "#F8F8F8" },
        ]}
        onPress={() => setSelected(0)}
      >
        <Text style={{ color: selected === 0 ? "white" : "#43BE79" }}>
          {language === "en" ? "Once a month" : "თვეში ერთხელ"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.switchItem,
          { backgroundColor: selected === 1 ? "#43BE79" : "#F8F8F8" },
        ]}
        onPress={() => setSelected(1)}
      >
        <Text style={{ color: selected === 1 ? "white" : "#43BE79" }}>
          {language === "en" ? "Twice a month" : "თვეში ორჯერ"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SwitchComp;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    marginVertical: 40,
  },
  switchItem: {
    height: 50,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
