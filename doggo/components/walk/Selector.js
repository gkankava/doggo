import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { languageProvider } from "../../store/language";

const Selector = ({ selectedService }) => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { language } = languageProvider();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: "#3CBF77",
          height: height * 0.0874,
          width: "48%",
          borderRadius: 18,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() =>
          navigation.navigate("WalkOrder", { serviceType: 0, selectedService })
        }
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
          ASAP
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{
          backgroundColor: "#F8F8F9",
          height: height * 0.0874,
          width: "48%",
          borderRadius: 18,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() =>
          navigation.navigate("WalkOrder", { serviceType: 1, selectedService })
        }
      >
        <Text style={{ color: "#3CBF77", fontSize: 18, fontWeight: "700" }}>
          {language === "en" ? "Schedule" : "დაგეგმვა"}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Selector;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
