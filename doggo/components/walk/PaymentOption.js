import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ChevronDown } from "react-native-iconly";

import { userDataProvider } from "../../store/userData";

const PaymentOption = ({ card, setCard, bsState, setBsState }) => {
  const { cards } = userDataProvider();

  React.useEffect(() => {
    cards.length > 0 && setCard(cards[0]);
  }, []);

  return (
    <TouchableOpacity
      style={styles.paySelect}
      onPress={() =>
        setBsState({ isActive: !bsState.isActive, com: "payment" })
      }
    >
      {card ? (
        <>
          <Image
            source={
              card.card_mask[0] === "4"
                ? require("../../assets/icons/visa.png")
                : require("../../assets/icons/mc.png")
            }
            style={{ marginRight: 10 }}
          />
          <Text style={{ marginRight: 10, color: "#46596C" }}>
            **** **** ****
          </Text>
          <Text style={{ color: "#46596C" }}>{card?.card_mask.slice(-4)}</Text>
        </>
      ) : (
        <Text>Add New</Text>
      )}
      <ChevronDown
        set="light"
        primaryColor="#200E32"
        style={{ marginLeft: "auto" }}
      />
    </TouchableOpacity>
  );
};

export default PaymentOption;

const styles = StyleSheet.create({
  paySelect: {
    borderRadius: 18,
    backgroundColor: "#F8F8F9",
    height: 75,
    width: "100%",
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});
