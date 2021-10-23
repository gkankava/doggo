import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import { languageProvider } from "../../../store/language";

const HistoryCard = ({ name, img, price, date, route, rec = false }) => {
  const { height, width } = useWindowDimensions();
  const { language } = languageProvider();

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      style={[styles.container, { height: height * 0.127 }]}
    >
      <Image
        style={[styles.img, { height: height * 0.1, width: height * 0.1 }]}
        //  source={{ uri: img }}
        source={img}
        resizeMode="cover"
      />
      <View style={styles.innerContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>
          {price} {language === "en" ? "Gel" : "ლარი"}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      {rec && (
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, { height: height * 0.032, width: width * 0.2 }]}
          >
            <Text style={styles.btnText}>
              {language === "en" ? "Reorder" : "თავიდან"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  container: {
    padding: 14,
    width: "100%",
    backgroundColor: "#F8F8F9",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 18,
    marginBottom: 18,
  },
  img: {
    minHeight: 40,
    minWidth: 40,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "white",
  },
  innerContainer: {
    marginHorizontal: 8,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    height: "100%",
  },
  name: {
    fontSize: 14,
    color: "#46596C",
    fontWeight: "600",
  },
  price: {
    fontSize: 12,
    fontWeight: "500",
    color: "#697888",
  },
  date: {
    fontSize: 12,
    fontWeight: "400",
    color: "#9EA7B2",
  },
  btnContainer: {
    height: "100%",
    justifyContent: "flex-end",
    marginLeft: "auto",
  },
  btn: {
    backgroundColor: "#3CBF77",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { color: "white", fontSize: 11, fontWeight: "600" },
});
