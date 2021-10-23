import React, { createRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { userProvider } from "../../store/auth";
import { userDataProvider } from "../../store/userData";
import { removeAddress } from "../../store/actions/address";

import { Location, Delete } from "react-native-iconly";

const AddressItem = ({ id, address, info, def, setDef }) => {
  const { height } = useWindowDimensions();
  const { currentUser } = userProvider();
  const { addresses, setAddresses } = userDataProvider();

  const [isLoading, setIsLoading] = useState(false);

  const sw = createRef();

  const DelBtn = () => (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: 8 }} />
      <TouchableOpacity
        style={[styles.del, { height: height * 0.105 }]}
        onPress={() => {
          sw.current.close();
          removeAddress(
            currentUser.user.id,
            id,
            addresses,
            setAddresses,
            setIsLoading
          );
        }}
      >
        <Delete set="bold" primaryColor="white" size={20} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable ref={sw} overshootRight={false} renderRightActions={DelBtn}>
      <TouchableOpacity
        activeOpacity={0.98}
        style={[styles.container, { height: height * 0.105 }]}
      >
        {isLoading ? (
          <View
            style={{
              align: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <Location set="bold" primaryColor="#3CBF77" size={24} />
            <View style={{ marginLeft: 25 }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#46596C",
                  marginBottom: 5,
                  maxWidth: "85%",
                }}
              >
                {address}
              </Text>
              <Text
                style={{ fontSize: 12, fontWeight: "400", color: "#9FA9B2" }}
              >
                {info || "..."}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "white",
                height: 26,
                width: 26,
                borderRadius: 13,
                borderWidth: def === id ? 8 : 3,
                borderColor: "#3CBF77",
                marginLeft: "auto",
              }}
            />
          </>
        )}
      </TouchableOpacity>
    </Swipeable>
  );
};

export default AddressItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: "#F8F8F9",
    padding: 25,
    marginBottom: 10,
  },
  del: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FA4242",
    borderRadius: 18,
    width: 65,
    paddingVertical: 25,
  },
});
