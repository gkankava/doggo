import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Home, Document, Star, User, Setting } from "react-native-iconly";

import MenuItem from "./MenuItem";

const Menu = ({ setModalVisible }) => {
  return (
    <ScrollView style={styles.container} horizontal={false}>
      {list.map((i, k) => (
        <MenuItem
          key={k}
          uuid={i.uuid}
          title={i.title}
          icon={i.icon}
          setModalVisible={setModalVisible}
        />
      ))}
    </ScrollView>
  );
};

export default Menu;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    width: width - 40,
    marginTop: 50,
  },
});

const list = [
  {
    uuid: "Main",
    title: "მთავარი",
    icon: (color) => <Home set="bold" primaryColor={color} />,
  },
  {
    uuid: "History",
    title: "ისტორია",
    icon: (color) => <Document set="bold" primaryColor={color} />,
  },
  {
    uuid: "Rating",
    title: "რეიტინგი",
    icon: (color) => <Star set="bold" primaryColor={color} />,
  },
  {
    uuid: "Info",
    title: "ჩემი ინფორმაცია",
    icon: (color) => <User set="bold" primaryColor={color} />,
  },
  {
    uuid: "Settings",
    title: "პარამეტრები",
    icon: (color) => <Setting set="bold" primaryColor={color} />,
  },
];
