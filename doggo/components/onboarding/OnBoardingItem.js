import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";

import { languageProvider } from "../../store/language";

const OnBoardingItem = ({ item }) => {
  const { language } = languageProvider();
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={{
          flex: 0.7,
          resizeMode: "contain",
          justifyContent: "center",
        }}
      />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title[language]}</Text>
        <Text style={styles.desc}>{item.description[language]}</Text>
      </View>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#43BE79",
    textAlign: "center",
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
    fontWeight: "400",
    color: "#46596C",
    textAlign: "center",
  },
});
