import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Dogs from "./bs/Dogs";
import Address from "./bs/Address";
import Comment from "../food/Comment";
import Choose from "./bs/Choose";
import Payment from "./bs/Payment";

const BS = ({
  bs,
  bsState,
  setBsState,
  language,
  selectedDog,
  setSelectedDog,
  selectedAddress,
  setSelectedAddress,
  comment,
  setComment,
  selectedWalker,
  setSelectedWalker,
  selectedCard,
  setSelectedCard,
}) => {
  const ContentView = ({ activeItem }) => {
    switch (activeItem) {
      case "dogs":
        return (
          <Dogs
            selectedDog={selectedDog}
            setSelectedDog={setSelectedDog}
            setBsState={setBsState}
          />
        );
      case "addr":
        return (
          <Address
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            setBsState={setBsState}
          />
        );
      case "comment":
        return (
          <Comment
            comment={comment}
            bs={bs}
            language={language}
            setComment={setComment}
          />
        );
      case "choose":
        return (
          <Choose
            language={language}
            setBsState={setBsState}
            selectedWalker={selectedWalker}
            setSelectedWalker={setSelectedWalker}
          />
        );
      case "payment":
        return (
          <Payment
            setBsState={setBsState}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        );
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.handle} />
      <ContentView activeItem={bsState.com} />
    </View>
  );
};

export default BS;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    padding: 20,
    minHeight: "100%",
  },
  handle: {
    width: 50,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#D9F8D9",
    marginBottom: 20,
    alignSelf: "center",
  },
});
