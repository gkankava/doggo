import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { TimeCircle, ChevronRightCircle } from "react-native-iconly";

const OrderCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (item.order_status == 0) {
          navigation.navigate("OrderStack", {
            screen: "OrderDetails",
            params: {
              order: item,
            },
          });
        } else {
          navigation.navigate("OrderStack", {
            screen: "MapView",
            params: {
              order: item,
            },
          });
        }
      }}
    >
      <Image
        source={require("../../../../assets/images/dog.png")}
        style={styles.image}
      />
      <View style={styles.innerContainer}>
        {item.name && <Text style={styles.name}>{item.name}</Text>}
        <Text style={styles.address}>{item.address}</Text>
        <Text style={styles.comment}>{item.comment}</Text>
        <View style={styles.timeContainer}>
          <TimeCircle set="bold" primaryColor="#3CBF77" size={17} />
          <Text style={styles.time}>
            {item.service_type === 0 ? "ASAP" : item.scheduled_time}
          </Text>
        </View>
      </View>
      <ChevronRightCircle
        set="bold"
        primaryColor="#3CBF77"
        size={17}
        style={styles.arrow}
      />
    </TouchableOpacity>
  );
};

export default OrderCard;

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    padding: 15,
    flexDirection: "row",
    backgroundColor: "#F8F8F9",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12.5,
    borderRadius: 18,
    alignSelf: "center",
  },
  image: {
    width: 80,
    height: 80,

    borderRadius: 18,
    marginRight: 15,
  },
  innerContainer: {
    height: 80,
    justifyContent: "space-between",
    marginRight: "auto",
  },
  name: { color: "#3CBF77", fontSize: 18, fontWeight: "500" },
  address: { color: "#46596C", fontSize: 12, fontWeight: "400" },
  comment: { color: "#7B8896", fontSize: 12, fontWeight: "300" },
  timeContainer: { flexDirection: "row", alignItems: "center" },
  time: { color: "#46596C", fontSize: 12, fontWeight: "400", marginLeft: 5 },
  arrow: {
    alignSelf: "flex-end",
  },
});
