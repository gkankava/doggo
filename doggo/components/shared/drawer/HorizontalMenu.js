import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { languageProvider } from "../../../store/language";
import { mc } from "./content/menu";

const HorizontalMenu = () => {
  const { language } = languageProvider();
  const ln = mc[language];

  const [selected, setSelected] = useState(0);
  return (
    <ScrollView
      horizontal={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor: selected === 0 ? "#43BE79" : "white",
          },
        ]}
        onPress={() => {
          setSelected(0);
        }}
      >
        <Text
          style={[styles.txt, { color: selected === 0 ? "white" : "#43BE79" }]}
        >
          {ln.food}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor: selected === 1 ? "#43BE79" : "white",
          },
        ]}
        onPress={() => {
          setSelected(1);
        }}
      >
        <Text
          style={[styles.txt, { color: selected === 1 ? "white" : "#43BE79" }]}
        >
          {ln.walk}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor: selected === 2 ? "#43BE79" : "white",
          },
        ]}
        onPress={() => {
          setSelected(2);
        }}
      >
        <Text
          style={[styles.txt, { color: selected === 2 ? "white" : "#43BE79" }]}
        >
          {ln.hotels}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor: selected === 3 ? "#43BE79" : "white",
          },
        ]}
        onPress={() => {
          setSelected(3);
        }}
      >
        <Text
          style={[styles.txt, { color: selected === 3 ? "white" : "#43BE79" }]}
        >
          {ln.saloons}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HorizontalMenu;

const styles = StyleSheet.create({
  item: {
    width: 150,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#43BE79",
    borderWidth: 1,
    marginRight: 10,
  },
  txt: {
    fontSize: 14,
    fontWeight: "600",
  },
});
