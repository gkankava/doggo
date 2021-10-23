import React from "react";
import { StyleSheet, Text, View, Switch } from "react-native";

const Discount = ({ discount, isEnabled, toggleSwitch }) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 20,
        },
      ]}
    >
      <Text style={{ color: "#FF7D4A", fontWeight: "700", fontSize: 16 }}>
        DOGGO {discount}
      </Text>
      <Switch
        trackColor={{ false: "#F8F8F9", true: "#43BE79" }}
        thumbColor={"#f4f3f4"}
        ios_backgroundColor="#F8F8F9"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default Discount;

const styles = StyleSheet.create({});
