import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoadingIndicator from "../shared/LoadingIndicator";
import { useFocusEffect } from "@react-navigation/native";
import { getData } from "../../handlers/localStorage";

import { userProvider } from "../../store/user";
import { ordersProvider } from "../../store/orders";

import {
  fetchOrders,
  fetchInitiatedOrders,
  fetchOrder,
} from "../../store/actions/orders";

import Orders from "./Orders";

const MainScreen = () => {
  const { currentUser } = userProvider();
  const { orders, setOrders, asapOrders, setAsapOrders, setActiveOrder } =
    ordersProvider();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let id = currentUser.user.id;
    fetchInitiatedOrders(asapOrders, setAsapOrders, setLoading);
    // fetchOrders(id, orders, setOrders, setLoading);
    getData("ACTIVE_ORDER").then((id) => {
      if (id) {
        fetchOrder(id, setActiveOrder);
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {loading ? <LoadingIndicator /> : <Orders />}
    </View>
  );
};

export default MainScreen;
