import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderCloseButton from "../headers/HeaderCloseButton";
import { Logout } from "react-native-iconly";

import { languageProvider } from "../../../store/language";
import { dc } from "../../../stacks/content/drawer";

import { userProvider } from "../../../store/auth";

import defPic from "../../../assets/images/default.jpeg";

import Menu from "./Menu";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const DrawerSidebar = ({ state, toogle }) => {
  const navigation = useNavigation();
  const { currentUser, logOut } = userProvider();

  const { language } = languageProvider();
  const ln = dc[language];

  const name = currentUser.user.name || "null";

  return (
    <View style={styles.container}>
      {/* <SafeAreaView style={styles.sav}> */}
      <View style={styles.top}>
        <View style={styles.left}>
          <Image source={defPic} style={styles.pp} />
          <View style={styles.greeting}>
            <Text style={{ fontSize: 21, color: "black" }}>{ln.greeting}</Text>
            <Text style={{ fontSize: 21, color: "#43BE79" }}>{name}!</Text>
          </View>
        </View>
        <HeaderCloseButton toogle={toogle} />
      </View>
      <View style={styles.mid}>
        <Menu toogle={toogle} />
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => logOut()}
        >
          <Logout set="bold" primaryColor="#3CBF77" size={24} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#3CBF77",
              marginLeft: 10,
            }}
          >
            {ln.logout}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("DrawerStack", { screen: "Terms" })
          }
          style={{}}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "#46596C",
            }}
          >
            {ln.pp}
          </Text>
        </TouchableOpacity>
      </View>
      {/* </SafeAreaView> */}
    </View>
  );
};

export default DrawerSidebar;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 50,
    backgroundColor: "white",
    width: width,
    height: height,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  sav: {},
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: 81,
  },
  left: { flexDirection: "row" },
  pp: { width: 81, height: 81, borderRadius: 20, marginRight: 20 },
  mid: {
    marginTop: 50,
    flexDirection: "column",
    // flexGrow: 1,
    height: height - 81 - 74 - 150,
    backgroundColor: "white",
  },
  bottom: {
    marginTop: "auto",
    marginBottom: 37,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingBottom: 30,
    height: 74,
  },
});
