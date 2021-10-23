import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { languageProvider } from "../../../store/language";

import AuthInput from "../inputs/AuthInput";
import BtnFill from "../buttons/BtnFill";

const Promos = ({ navigation }) => {
  const { language } = languageProvider();
  const [newPromo, setNewPromo] = useState("");

  return (
    <View style={styles.container}>
      <AuthInput
        type="promo"
        placeholder={
          language === "en" ? "Enter promo code" : "ჩაწერე პრომო კოდი"
        }
        value={newPromo}
        onChangeText={(text) => setNewPromo(text)}
      />
      <BtnFill
        title={language === "en" ? "Enter" : "დამატება"}
        st={{ marginTop: "auto", marginBottom: 30 }}
        callback={() => {
          navigation.goBack();
        }}
        disabled={newPromo.length < 1}
      />
    </View>
  );
};

export default Promos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
});
