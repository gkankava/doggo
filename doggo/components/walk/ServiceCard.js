import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { languageProvider } from "../../store/language";

const ServiceCard = ({
  item,
  selected = false,
  setSelected = () => {},
  st = false,
}) => {
  const { language } = languageProvider();

  const { id, name, duration, price } = item;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.container]}
      onPress={() => !st && setSelected(parseInt(id))}
    >
      {!st && (
        <View
          style={{
            backgroundColor: "white",
            height: 26,
            width: 26,
            borderRadius: 13,
            borderWidth: selected === parseInt(id) ? 8 : 3,
            borderColor: "#3CBF77",
          }}
        />
      )}

      <View style={[styles.infoContainer, { marginLeft: st ? 0 : 20 }]}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.dur}>
          {duration}
          {language === "en" ? "min" : " წთ"}
        </Text>
      </View>
      <Text style={styles.right}>{price}₾</Text>
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    paddingHorizontal: 34,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#F8F8F9",
  },
  infoContainer: {
    marginLeft: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3CBF77",
    marginBottom: 5,
  },
  dur: {
    fontSize: 16,
    fontWeight: "300",
    color: "#B5C8DB",
  },
  right: {
    marginLeft: "auto",
    alignSelf: "flex-start",
    fontSize: 18,
    color: "#3CBF77",
    fontWeight: "700",
  },
});
