import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ChevronDown } from "react-native-iconly";

import { wc } from "./content/order";
import { languageProvider } from "../../store/language";
import { userDataProvider } from "../../store/userData";
import { breedsProvider } from "../../store/breeds";

const DogSelector = ({ bsState, setBsState, selectedDog, setSelectedDog }) => {
  const { dogs } = userDataProvider();
  const { breeds } = breedsProvider();
  const { language } = languageProvider();
  const ln = wc[language];

  const [age, setAge] = useState(10);
  const [breed, setBreed] = useState("");

  useEffect(() => {
    if (dogs.length > 0) {
      setSelectedDog(dogs[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedDog) {
      let by = parseInt(selectedDog.birth_date.slice(0, 4));
      let bm = parseInt(selectedDog.birth_date.slice(5, 7));
      let bd = parseInt(selectedDog.birth_date.slice(8, 10));
      setAge(calculate_age(bm, bd, by));
      let res = breeds.find((i) => i.id === selectedDog.id);
      if (res) {
        language === "en" ? setBreed(res.name_eng) : setBreed(res.name_geo);
      }
    }
  }, [selectedDog]);

  const calculate_age = (birth_month, birth_day, birth_year) => {
    let today_date = new Date();
    let today_year = today_date.getFullYear();
    let today_month = today_date.getMonth();
    let today_day = today_date.getDate();
    let age = today_year - birth_year;

    if (today_month < birth_month - 1) {
      age--;
    }
    if (birth_month - 1 == today_month && today_day < birth_day) {
      age--;
    }
    return age;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setBsState({ isActive: !bsState.isActive, com: "dogs" })}
    >
      {dogs.length > 0 ? (
        <>
          <Image
            source={require("../../assets/dummy/dog.png")}
            style={styles.image}
          />
          <View style={styles.detContainer}>
            <Text style={styles.name}>{selectedDog?.name}</Text>
            <Text style={styles.info} numberOfLines={1}>
              {age} {language === "en" ? "years" : "წლის"} {breed}
            </Text>
          </View>
          <ChevronDown
            set="light"
            primaryColor="black"
            style={{ marginLeft: "auto" }}
          />
        </>
      ) : (
        <>
          {/* <Plus set="curved" primaryColor="#3CBF77" size={30} opacity={0.5} /> */}
          <Text style={{ fontSize: 16, color: "#46596C" }}>{ln.newDog}</Text>
          <ChevronDown
            set="light"
            primaryColor="black"
            style={{ marginLeft: "auto" }}
          />
        </>
      )}
    </TouchableOpacity>
  );
};

export default DogSelector;

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 30,
  },
  image: {
    height: height * 0.098,
    width: height * 0.098,
    borderRadius: 18,
    resizeMode: "contain",
  },
  detContainer: { marginLeft: 20 },
  name: {
    fontSize: 22,
    color: "#3CBF77",
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: "#46596C",
    maxWidth: "90%",
  },
});
