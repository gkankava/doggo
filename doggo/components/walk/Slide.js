import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";

import { languageProvider } from "../../store/language";

const Slide = ({ item }) => {
  const { language } = languageProvider();
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={{
          height: "40%",
          resizeMode: "contain",
          justifyContent: "center",
        }}
      />
      <View style={{}}>
        <Text style={styles.title}>{item.title[language]}</Text>
        <Text style={styles.desc}>{item.description[language]}</Text>
      </View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#43BE79",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 2,
  },
  desc: {
    fontSize: 12,
    fontWeight: "400",
    color: "#46596C",
    textAlign: "center",
  },
});
