import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import DrawerSidebar from "../shared/drawer/DrawerSidebar";
import MainHeader from "./MainHeader";
import Menu from "./Menu";
import MainFooter from "./MainFooter";

import { getData, removeData } from "../../handlers/localStorage";
import { fetchWalkOrderDetails } from "../../store/actions/walkServices";
import { walkOrderProvider } from "../../store/walkOrder";

const MainScreen = ({ navigation }) => {
  const [drawerShown, setDrawerShown] = useState(false);
  const { setActiveOrder, activeOrder } = walkOrderProvider();

  useEffect(() => {
    getData("active_order").then((id) => {
      console.log("setting from main screen");
      if (id) {
        console.log("id:", id);
        fetchWalkOrderDetails(id, setActiveOrder);
      }
    });
  }, []);

  // useEffect(() => {
  //   if (activeOrder) {
  //     console.log("active order (TRUE)");
  //   } else {
  //     console.log("FALSE");
  //   }
  // }, [activeOrder]);

  return (
    <View style={styles.container}>
      <MainHeader state={drawerShown} toogle={setDrawerShown} />
      <Menu />
      <MainFooter />
      {drawerShown && (
        <DrawerSidebar state={drawerShown} toogle={setDrawerShown} />
      )}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
  },
});
