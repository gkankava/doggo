import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { ordersProvider } from "../../store/orders";
import { userProvider } from "../../store/user";

import { assignOrder } from "../../store/actions/orders";

import { Location, Calendar, Chat } from "react-native-iconly";

import Button from "../shared/buttons/Button";

const OrderDetails = ({ navigation, ...props }) => {
  const { setActiveOrder, asapOrders, setAsapOrders } = ordersProvider();
  const { currentUser } = userProvider();
  let { order } = props.route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Image
          style={styles.image}
          source={require("../../../assets/images/dog.png")}
        />
        <Text
          style={{
            color: "#3CBF77",
            fontSize: 24,
            fontWeight: "400",
            alignSelf: "center",
          }}
        >
          {order?.dog?.name || "name"}
        </Text>
        <Text style={styles.header}>არჩეული სერვისი</Text>
        <View
          style={{ padding: 20, backgroundColor: "#F8F8F9", borderRadius: 18 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Text style={{ color: "#3CBF77", fontSize: 18, fontWeight: "400" }}>
              {order?.walk_service?.name || "walk_service"}
            </Text>
            <Text style={{ color: "#3CBF77", fontSize: 18, fontWeight: "400" }}>
              {order.walk_service?.price || "0.001"} ₾
            </Text>
          </View>
          <Text style={{ color: "#B5C8DB", fontSize: 18, fontWeight: "400" }}>
            {order.walk_service?.duration || "20"} წთ
          </Text>
        </View>
        <Text style={styles.header}>გამოძახების დეტალები</Text>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#43BE79",
            borderBottomWidth: 0.5,
            paddingBottom: 10,
            marginBottom: 15,
          }}
        >
          <Location set={"bold"} primaryColor="#3CBF77" size={32} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#46596C" }}>
              {order.address}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#46596C" }}>
              {order.comment}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#43BE79",
            borderBottomWidth: 0.5,
            paddingBottom: 10,
            marginBottom: 15,
          }}
        >
          <Calendar set={"bold"} primaryColor="#3CBF77" size={32} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#46596C" }}>
              ASAP
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#46596C" }}>
              {order.scheduled_time}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#43BE79",
            borderBottomWidth: 0.5,
            paddingBottom: 10,
            marginBottom: 15,
          }}
        >
          <Chat set={"bold"} primaryColor="#3CBF77" size={32} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#46596C" }}>
              {order.comment || "..."}
            </Text>
          </View>
        </View>
        <Text style={styles.header}>გადასახდელი თანხა</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <Text style={{ color: "#46596C", fontSize: 18, fontWeight: "400" }}>
            მთლიანად
          </Text>
          <Text style={{ color: "#46596C", fontSize: 18, fontWeight: "500" }}>
            {order.walk_service?.price || "0.001"} ₾
          </Text>
        </View>
        <Button
          title={"შეკვეთის აღება"}
          st={{ marginTop: 30 }}
          onPress={() => {
            navigation.navigate("MapView");
            assignOrder(
              order.id,
              currentUser.user.id,
              setActiveOrder,
              asapOrders,
              setAsapOrders
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
  },
  image: {
    height: 91,
    width: 91,
    resizeMode: "contain",
    borderRadius: 5,
    alignSelf: "center",
  },
  header: {
    fontSize: 14,
    color: "#A2ACB5",
    fontWeight: "500",
    marginVertical: 15,
  },
});
