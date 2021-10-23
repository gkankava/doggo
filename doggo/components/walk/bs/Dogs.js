import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { ChevronDown } from "react-native-iconly";

import { languageProvider } from "../../../store/language";
import { userDataProvider } from "../../../store/userData";

const Dogs = ({ setBsState, selectedDog, setSelectedDog }) => {
  const { language } = languageProvider();
  const { dogs } = userDataProvider();

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
    <>
      {dogs.length > 0 &&
        dogs.map((i, k) => {
          let by = parseInt(i.birth_date.slice(0, 4));
          let bm = parseInt(i.birth_date.slice(5, 7));
          let bd = parseInt(i.birth_date.slice(8, 10));
          let age = calculate_age(bm, bd, by);
          return (
            <TouchableOpacity
              key={k}
              style={styles.container}
              onPress={() => {
                setSelectedDog(i);
                setBsState({ isActive: false, com: null });
              }}
            >
              <Image
                source={require("../../../assets/dummy/dog.png")}
                style={styles.image}
              />
              <View style={styles.detContainer}>
                <Text style={styles.name}>{i.name}</Text>
                <Text style={styles.info} numberOfLines={1}>
                  {age} {language === "en" ? "years" : "წლის"}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderWidth: selectedDog.id === i.id ? 5 : 1,
                  borderColor: "#3CBF77",
                }}
              />
            </TouchableOpacity>
          );
        })}
    </>
  );
};

export default Dogs;

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 18,
  },
  image: {
    height: height * 0.098,
    width: height * 0.098,
    borderRadius: 18,
    resizeMode: "contain",
  },
  detContainer: { marginLeft: 20, marginRight: "auto" },
  name: {
    fontSize: 22,
    color: "#3CBF77",
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: "#46596C",
    maxWidth: "100%",
  },
});
