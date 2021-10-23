import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

import { languageProvider } from "../../store/language";
import { cc } from "./content/confirm";

import { shopProvider } from "../../store/products";

import BtnFill from "../shared/buttons/BtnFill";

const Confirmation = ({ navigation }) => {
  const { language } = languageProvider();
  const ln = cc[language];

  const { setOrder, initialOrder } = shopProvider();

  useEffect(() => {
    setOrder({
      delivery_date_one: null,
      products: [],
      delivery_address: null,
      card_id: null,
      has_discount: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/artworks/orderconfirm.png")}
        style={{ width: "80%", marginTop: "30%" }}
        resizeMode={"contain"}
      />
      <Text style={{ color: "#3CBF77", fontSize: 18, marginVertical: 20 }}>
        {ln.title}
      </Text>
      <Text style={{ textAlign: "center", maxWidth: "80%" }}>{ln.sub}</Text>
      <TouchableOpacity style={{ marginTop: "auto", marginBottom: 20 }}>
        <Text>{ln.btnDet}</Text>
      </TouchableOpacity>
      <BtnFill
        title={ln.btnMain}
        st={{ width: "85%" }}
        callback={() => navigation.navigate("Main", { screen: "Main" })}
      />
    </SafeAreaView>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
