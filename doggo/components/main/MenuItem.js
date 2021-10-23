import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const MenuItem = ({
  title,
  info,
  img,
  bgout,
  bgin,
  top,
  z,
  route,
  disabled,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        styles.bg,
        {
          backgroundColor: bgout,
          zIndex: z,
        },
      ]}
      activeOpacity={1}
      disabled={disabled}
      onPress={() => {
        navigation.navigate(route);
      }}
    >
      <View style={[styles.container, { backgroundColor: bgin }]}>
        <View style={styles.inner}>
          <View style={styles.left}>
            <Text style={styles.title}>{title}</Text>
            <Text numberOfLines={2} style={styles.info}>
              {info}
            </Text>
          </View>
          <Image
            source={img}
            style={[
              styles.img,
              { tintColor: disabled && "white", opacity: disabled && 0.3 },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;

const sh = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  bg: {
    height: (sh * 0.88 - 118) * 0.22142,

    width: "100%",
  },
  container: {
    top: -0.2,
    height: (sh * 0.88 - 118) * 0.22142,
    borderBottomLeftRadius: 45,
    paddingHorizontal: 30,
    paddingBottom: 15,
    justifyContent: "flex-end",
    shadowColor: "black",
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: "100%",
  },
  left: { flexDirection: "column", maxWidth: "60%" },
  title: { fontSize: 20, fontWeight: "600", color: "white", marginBottom: 10 },
  info: { fontSize: 12, color: "white" },
  img: {
    width: (sh * 0.88 - 118) * 0.17142 * 0.8,
    height: (sh * 0.88 - 118) * 0.17142 * 0.8,
  },
});
