import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

import { userDataProvider } from "../../../store/userData";

const Payment = ({ setBsState, selectedCard, setSelectedCard }) => {
  const { cards } = userDataProvider();

  return (
    <>
      {cards.length > 0 &&
        cards.map((i, k) => {
          return (
            <TouchableOpacity
              key={k}
              style={styles.paySelect}
              onPress={() => setBsState({ isActive: false, com: null })}
            >
              <>
                <Image
                  source={
                    i.card_mask[0] === "4"
                      ? require("../../../assets/icons/visa.png")
                      : require("../../../assets/icons/mc.png")
                  }
                  style={{ marginRight: 10 }}
                />
                <Text style={{ marginRight: 10, color: "#46596C" }}>
                  **** **** ****
                </Text>
                <Text style={{ color: "#46596C" }}>
                  {i.card_mask.slice(-4)}
                </Text>
              </>
              <View
                style={{
                  marginLeft: "auto",
                  backgroundColor: "white",
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderWidth: selectedCard?.id === i.id ? 5 : 1,
                  borderColor: "#3CBF77",
                }}
              />
            </TouchableOpacity>
          );
        })}
    </>
  );
};

export default Payment;

const styles = StyleSheet.create({
  paySelect: {
    borderRadius: 18,
    backgroundColor: "white",
    height: 75,
    width: "100%",
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});
