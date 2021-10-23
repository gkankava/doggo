import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ChevronRight } from "react-native-iconly";
import { useNavigation } from "@react-navigation/native";

const MenuItem = ({ icon, title, route }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(route)}
    >
      {icon}
      <Text style={styles.title}>{title}</Text>
      <ChevronRight set="bold" primaryColor="#46596C" size={24} />
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 42,
  },
  title: {
    marginRight: "auto",
    marginLeft: 10,
    color: "#46596C",
    fontSize: 18,
    fontWeight: "600",
  },
});
