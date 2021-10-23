import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useLinkTo } from "@react-navigation/native";
import { Plus } from "react-native-iconly";

import visa from "../../assets/icons/visa.png";
import mc from "../../assets/icons/mc.png";

const PaymentContent = ({ cards, setCard, bs, set, language }) => {
  const linkTo = useLinkTo();

  return (
    <View
      style={{
        paddingBottom: 20,
        paddingTop: 30,
        backgroundColor: "white",
        marginTop: 20,
        minHeight: "80%",
        borderRadius: 18,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          color: "#46596C",
          marginLeft: 20,
          marginBottom: 20,
        }}
      >
        {language === "en"
          ? "Choose payment method"
          : "აირჩიეთ გადახდის მეთოდი"}
      </Text>
      <>
        {cards.map((i, k) => (
          <TouchableOpacity
            key={k}
            style={styles.generalDetContainer}
            onPress={() => {
              setCard(i);
              bs.current.snapTo(0);
            }}
          >
            <Image
              style={{ marginRight: 20 }}
              source={i.card_mask[0] === "4" ? visa : mc}
            />
            <Text style={{ color: "#46596C", fontSize: 13 }}>
              **** **** **** {i.card_mask.slice(-4)}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.generalDetContainer, { justifyContent: "center" }]}
          onPress={() => {
            linkTo("/drawer/personal/payment");
          }}
        >
          <Plus set="curved" primaryColor="#3CBF77" size={30} opacity={0.5} />
        </TouchableOpacity>
      </>
    </View>
  );
};

export default PaymentContent;

const styles = StyleSheet.create({
  generalDetContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginBottom: 10,
  },
});
