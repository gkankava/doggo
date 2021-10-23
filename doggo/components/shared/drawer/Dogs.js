import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { languageProvider } from "../../../store/language";
import { userDataProvider } from "../../../store/userData";

import DogCard from "../../shared/cards/DogCard";

const Dogs = ({ navigation }) => {
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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        style={styles.list}
      >
        {dogs.length > 0 &&
          dogs.map((item, key) => {
            let by = parseInt(item.birth_date.slice(0, 4));
            let bm = parseInt(item.birth_date.slice(5, 7));
            let bd = parseInt(item.birth_date.slice(8, 10));
            let age = calculate_age(bm, bd, by);
            return (
              <DogCard
                key={key}
                name={item.name}
                img={item.img || require("../../../assets/dummy/dogprof.jpeg")}
                age={age}
                breed={item.breed}
                id={item.id}
              />
            );
          })}
        <TouchableOpacity onPress={() => navigation.navigate("NewDog")}>
          <Text style={styles.new}>
            {language === "en" ? "+ New dog" : "+ დაამატე ძაღლი"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Dogs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  new: {
    textAlign: "center",
    color: "#43BE79",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 40,
  },
});
