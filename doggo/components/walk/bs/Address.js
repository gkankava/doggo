import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Location } from "react-native-iconly";

import { userDataProvider } from "../../../store/userData";

const Address = ({ setBsState, selectedAddress, setSelectedAddress }) => {
  const { addresses } = userDataProvider();
  return (
    <>
      {addresses.length > 0 &&
        addresses.map((i, k) => {
          return (
            <TouchableOpacity
              key={k}
              style={styles.container}
              onPress={() => {
                setSelectedAddress(i);
                setBsState({ isActive: false, com: null });
              }}
            >
              <Location set="bold" primaryColor="#3CBF77" size={24} />
              <View style={styles.inner}>
                <Text style={styles.name} numberOfLines={1}>
                  {i.name}
                </Text>
                {i.comment && (
                  <Text style={styles.info} numberOfLines={1}>
                    {i.comment}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
    </>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 30,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
  },
  inner: {
    flexDirection: "column",
    marginLeft: 10,
    //  width: "100%",
  },
  name: {
    fontSize: 15,
    color: "#46596C",
    marginBottom: 5,
    maxWidth: "95%",
  },
  info: {
    fontSize: 13,
    color: "#46596C",
    maxWidth: "100%",
  },
});
