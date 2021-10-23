import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";

const Card = ({ item }) => (
  <TouchableOpacity
    style={{
      padding: 20,
      height: sh * 0.25 * 0.659,
      width: sh * 0.25 * 0.659,
      minWidth: 150,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 40,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 10,
      marginRight: 36,
      backgroundColor: item.bg,
      position: "relative",
    }}
  >
    <Image
      source={item.img}
      style={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 10,
        position: "absolute",
        height: sh * 0.25 * 0.659,
        width: sh * 0.25 * 0.659,
        minWidth: 150,
        top: 0,
        left: 0,
      }}
    />
    <Text
      style={{
        color: "white",
        fontSize: 15,
        fontWeight: "600",
        position: "absolute",
        bottom: 20,
        left: 20,
      }}
    >
      {item.title}
    </Text>
  </TouchableOpacity>
);

const PromoItem = ({ title, bg, z }) => {
  return (
    <View style={[styles.container, { backgroundColor: bg, zIndex: z }]}>
      <View style={styles.inner}>
        <Text style={styles.title}>{title}</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
};

export default PromoItem;

const data = [
  {
    id: "01",
    title: "სპეციალურიო შეთავაზება",
    bg: "#3E95C1",
    img: require("../../assets/images/dog1.jpeg"),
  },
  {
    id: "02",
    title: "სპეციალურიო შეთავაზება",
    bg: "#F1A303",
    img: require("../../assets/images/dog2.jpeg"),
  },
  {
    id: "03",
    title: "სპეციალურიო შეთავაზება",
    bg: "#3E95C1",
    img: require("../../assets/images/dog1.jpeg"),
  },
];

const sh = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 45,
    width: "100%",
    height: sh * 0.25,
    paddingHorizontal: 30,
    paddingBottom: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    justifyContent: "flex-end",
  },
  inner: {
    height: "100%",
    paddingTop: 15,
  },
  title: {
    fontSize: 21,
    fontWeight: "600",
    color: "white",
    marginBottom: 10,
  },
});
