import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";

import { setPushNotificationToken } from "./notifications";
import { userProvider } from "../store/user";
import { ordersProvider } from "../store/orders";

import { fetchOrder } from "../store/actions/orders";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NC() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const { currentUser } = userProvider();
  const { asapOrders, setAsapOrders } = ordersProvider();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      setPushNotificationToken(currentUser.user.id, token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response listener: ", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (notification) {
      const { id, service_type } = notification.request.content.data.order;
      const location = notification.request.content.data.selectedAddr;
      if (service_type === 0) {
        let as = true;
        fetchOrder(id, setAsapOrders, as, asapOrders);
        setNotification(false);
      }
    }
  }, [notification]);

  return null;
}

async function schedulePushNotification(notificationCard) {
  await Notifications.scheduleNotificationAsync();
}
// {
//   content: {
//     title: "You've got mail! 📬",
//     body: "Here is the notification body",
//     data: { data: "goes here" },
//   },
//   trigger: { seconds: 2 },
// }
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("You have to enable notifications...");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}
