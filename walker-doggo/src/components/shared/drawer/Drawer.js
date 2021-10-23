import React from "react";
import { StyleSheet, Text, SafeAreaView, Modal, View } from "react-native";

import Header from "./Header";
import Menu from "./Menu";
import StatusBar from "./StatusBar";

const Drawer = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType={"fade"}
      transparent={false}
      statusBarTranslucent={true}
      visible={modalVisible}
      onRequestClose={() => {
        console.log("closing modal");
      }}
    >
      <SafeAreaView style={[styles.container]}>
        <Header setModalVisible={setModalVisible} />
        <Menu setModalVisible={setModalVisible} />
        <StatusBar />
      </SafeAreaView>
    </Modal>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
    paddingBottom: 20,
  },
});
