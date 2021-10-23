import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { languageProvider } from "../../store/language";
import { fc } from "./content/filter";

const CheckBoxContainer = ({ title }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <View style={styles.checkBoxContainer}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => setIsSelected(!isSelected)}
      >
        {isSelected && <Feather name="check" size={17} color="#818181" />}
      </TouchableOpacity>
      <Text style={styles.label}>{title}</Text>
    </View>
  );
};

const BsContent = () => {
  const { height } = useWindowDimensions();
  const { language } = languageProvider();
  const ln = fc[language];

  const [price, setPrice] = useState(-1);

  return (
    <View style={[styles.container, { minHeight: height * 0.7 - 30 }]}>
      <View style={styles.colContainer}>
        <Text style={styles.colHeading}>{ln.price}</Text>
        <TouchableOpacity
          style={[
            styles.selector,
            {
              backgroundColor: price === 0 ? "#3CBF77" : "white",
              borderColor: price === 0 ? "#3CBF77" : "#707070",
              marginBottom: 10,
            },
          ]}
          onPress={() => setPrice(0)}
        >
          <Text
            style={[
              styles.selectorTitle,
              { color: price === 0 ? "white" : "black" },
            ]}
          >
            {ln.htl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.selector,
            {
              backgroundColor: price === 1 ? "#3CBF77" : "white",
              borderColor: price === 1 ? "#3CBF77" : "#707070",
            },
          ]}
          onPress={() => setPrice(1)}
        >
          <Text
            style={[
              styles.selectorTitle,
              { color: price === 1 ? "white" : "black" },
            ]}
          >
            {ln.lth}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.colContainer}>
        <Text style={styles.colHeading}>{ln.categories}</Text>
        <CheckBoxContainer title={ln.dry} />
        <CheckBoxContainer title={ln.wet} />
      </View>
      <View style={styles.colContainer}>
        <Text style={styles.colHeading}>{ln.brand}</Text>
        <CheckBoxContainer title={"example_01"} />
        <CheckBoxContainer title={"example_02"} />
        <CheckBoxContainer title={"example_03"} />
        <CheckBoxContainer title={"example_04"} />
      </View>
      <View style={styles.colContainer}>
        <Text style={styles.colHeading}>{ln.dog}</Text>
        <CheckBoxContainer title={"example_01"} />
        <CheckBoxContainer title={"example_02"} />
        <CheckBoxContainer title={"example_03"} />
        <CheckBoxContainer title={"example_04"} />
        <CheckBoxContainer title={"example_05"} />
        <CheckBoxContainer title={"example_06"} />
        <CheckBoxContainer title={"example_07"} />
      </View>
    </View>
  );
};

export default BsContent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  seeMoreBtn: {
    color: "#46596C",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  colContainer: { marginVertical: 20 },
  colHeading: {
    fontSize: 14,
    fontWeight: "600",
    color: "#46596C",
    marginBottom: 20,
  },
  selector: {
    width: 190,
    paddingVertical: 13,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    borderWidth: 1,
  },
  selectorTitle: {
    fontSize: 16,
    color: "white",
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 23,
    height: 23,
    borderRadius: 5,
    borderWidth: 0,
    marginRight: 10,
    backgroundColor: "#E1F4DF",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
  },
});
