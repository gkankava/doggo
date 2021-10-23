import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { languageProvider } from "../../store/language";
import { ac } from "./content/address";

import { userDataProvider } from "../../store/userData";

import AddressItem from "./AddressItem";

const PaymentInfo = ({ navigation }) => {
  const { language } = languageProvider();
  const ln = ac[language];

  const addresses = userDataProvider((state) => state.addresses);
  const [def, setDef] = useState([]);

  useEffect(() => {
    if (addresses.length > 0) {
      for (let i = 0; i < addresses.length; i++) {
        if (addresses[i].is_default) {
          setDef(addresses[i].id);
        } else setDef(addresses[0].id);
      }
    }
  }, [addresses]);

  console.log(addresses);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{ln.heading}</Text>
      <ScrollView
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {addresses.map((i, key) => (
          <AddressItem key={key} id={i.id} address={i.name} info={i.comment} />
        ))}
        <TouchableOpacity onPress={() => navigation.navigate("NewAddress")}>
          <Text style={styles.new}>{ln.new}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PaymentInfo;

const dummy = [
  {
    id: 0,
    address: "სულხან ცინცაძის 58",
    info: "კორპუსი C / სართული 2 / ბინა 58",
    default: false,
  },
  {
    id: 1,
    address: "სულხან ცინცაძის 59",
    info: "კორპუსი C / სართული 2 / ბინა 58",
    default: true,
  },
  {
    id: 0,
    address: "სულხან ცინცაძის 58",
    info: "კორპუსი C / სართული 2 / ბინა 58",
    default: false,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 12,
    fontWeight: "600",
    color: "#46596C",
    marginBottom: 20,
  },
  new: {
    textAlign: "center",
    color: "#43BE79",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 40,
  },
});
