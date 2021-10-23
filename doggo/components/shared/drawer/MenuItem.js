import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import {
  User,
  TimeCircle,
  Discount,
  TwoUsers,
  Calendar,
} from "react-native-iconly";
import { useNavigation } from "@react-navigation/native";
import dog from "../../../assets/icons/dogf.png";

const MenuItem = ({ text, icon, route, toogle }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        toogle(false);
        navigation.navigate("DrawerStack", { screen: route });
      }}
    >
      {icon === "info" ? (
        <User set="bold" primaryColor="#46596C" size={24} />
      ) : icon === "clock" ? (
        <TimeCircle set="bold" primaryColor="#46596C" size={24} />
      ) : icon === "promo" ? (
        <Discount set="bold" primaryColor="#46596C" size={24} />
      ) : icon === "refs" ? (
        <TwoUsers set="bold" primaryColor="#46596C" size={24} />
      ) : icon === "bookings" ? (
        <Calendar set="bold" primaryColor="#46596C" size={24} />
      ) : (
        <Image source={dog} style={{ height: 24, width: 24 }} />
      )}
      <Text
        style={{
          marginLeft: 20,
          fontSize: 18,
          color: "#46596C",
          fontWeight: "500",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
});
