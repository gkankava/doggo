import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useLinkTo } from "@react-navigation/native";
import { Location, Plus } from "react-native-iconly";

const AddressContent = ({ addresses, setAddress, bs, language }) => {
  const navigation = useNavigation();
  const linkTo = useLinkTo();

  return (
    <View
      style={{
        paddingBottom: 20,
        paddingTop: 30,
        backgroundColor: "white",
        marginTop: 20,
        minHeight: "80%",
        borderRadius: 18,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          color: "#46596C",
          marginLeft: 20,
          marginBottom: 10,
        }}
      >
        {language === "en" ? "Choose address" : "აირჩიეთ მისამართი"}
      </Text>
      <>
        {addresses.map((i, k) => (
          <TouchableOpacity
            key={k}
            style={styles.generalDetContainer}
            onPress={() => {
              setAddress(i);
              bs.current.snapTo(0);
            }}
          >
            <Location set="bold" primaryColor="#3CBF77" size={24} />
            <View style={{ marginLeft: 20 }}>
              <Text
                style={{
                  color: "#46596C",
                  fontSize: 16,
                  fontWeight: "500",
                  marginBottom: 8,
                }}
              >
                {i.name}
              </Text>
              <Text
                style={{
                  color: "#46596C",
                  fontSize: 14,
                  fontWeight: "400",
                }}
              >
                {i.comment || "..."}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.generalDetContainer, { justifyContent: "center" }]}
          onPress={() => {
            //   setAddress(i);
            //   bs.current.snapTo(0);
            linkTo("/drawer/personal/new-address");
          }}
        >
          <Plus set="curved" primaryColor="#3CBF77" size={30} opacity={0.5} />
        </TouchableOpacity>
      </>
    </View>
  );
};

export default AddressContent;

const styles = StyleSheet.create({
  generalDetContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderRadius: 18,
  },
});
