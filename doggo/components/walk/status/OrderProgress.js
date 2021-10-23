import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { languageProvider } from "../../../store/language";
import { walkOrderProvider } from "../../../store/walkOrder";
import { fetchWalkOrderDetails } from "../../../store/actions/walkServices";
import { sc } from "../content/status";

import search from "../../../assets/slides/walk-state/search.png";
import Slide from "./Slide";

const OrderProgress = ({ navigation, setOrderActive }) => {
  const { language } = languageProvider();
  const ln = sc[language];
  const { activeOrder, setActiveOrder } = walkOrderProvider();
  const timer = useRef(null);

  const ci = () => {
    clearInterval(timer.current);
  };

  const [isOrder, setIsOrder] = useState(false);

  useEffect(() => {
    if (activeOrder) {
      if (!isOrder) {
        setIsOrder(true);
      }
      console.log(
        "progress :  : ",
        activeOrder.order.order_status,
        activeOrder.order.id
      );

      if (parseInt(activeOrder.order.order_status) > 0) {
        console.log("progress :  : ", activeOrder.order.order_status);
        ci();
        setOrderActive(true);
      }
    }
  }, [activeOrder]);

  // useEffect(() => {
  //   if (isOrder) {
  //     interval.current = setInterval(() => {
  //       fetchWalkOrderDetails(activeOrder.order.id, setActiveOrder);
  //     }, 5000);
  //   }
  // }, [isOrder]);

  useFocusEffect(
    useCallback(() => {
      timer.current = setInterval(() => {
        fetchWalkOrderDetails(activeOrder.order.id, setActiveOrder);
      }, 5000);
      return () => {
        clearInterval(timer.current);
      };
    }, [isOrder])
  );

  return (
    <View style={styles.container}>
      <Slide t={ln.conf} img={search} />
    </View>
  );
};

export default OrderProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
