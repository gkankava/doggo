import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  StatusBarStyle,
  useWindowDimensions,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ordersProvider } from "../../store/orders";
import { TimeCircle, Location } from "react-native-iconly";
import Constants from "expo-constants";

import SliderButton from "../shared/buttons/SliderButton";

import {
  startOrder,
  updateOrderLocations,
  completeOrder,
} from "../../store/actions/orders";

const Map = () => {
  const { activeOrder, setActiveOrder } = ordersProvider();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeOrder) {
      setGeo({
        region: {
          latitude: activeOrder.latitude,
          longitude: activeOrder.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
      });
    }
  }, [activeOrder]);

  const { height, width } = useWindowDimensions();
  let initialLoaction = {
    latitude: activeOrder.latitude || -1,
    longitude: activeOrder.longitude || -1,
  };

  const [geo, setGeo] = useState({
    region: {
      latitude: initialLoaction.latitude,
      longitude: initialLoaction.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    },
  });

  console.log(activeOrder);
  const start = () => {
    startOrder(activeOrder.id, setActiveOrder, setLoading);
  };

  const handleStatusUpdate = () => {
    start();
    // console.log(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {geo.region.latitude > -1 && geo.region.longitude > -1 && (
        <MapView
          provider={"google"}
          style={{ height: height * 0.7, width }}
          initialRegion={geo.region}
          showsUserLocation={true}
          rotateEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: geo.region.latitude,
              longitude: geo.region.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <Image
              source={require("../../../assets/icons/marker.png")}
              style={{ width: 35, height: 35, resizeMode: "contain" }}
            />
          </Marker>
        </MapView>
      )}

      <View
        style={{
          height: height * 0.3 + Constants.statusBarHeight,
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 25,
              borderColor: "#E8EBED",
              borderRadius: 10,
              borderWidth: 1,
              width: 36,
              height: 36,
            }}
          >
            <Location set={"bold"} primaryColor="#46596C" size={26} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#46596C" }}>
              {activeOrder.address}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#46596C" }}>
              {activeOrder.comment || "..."}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 25,
              borderColor: "#E8EBED",
              borderRadius: 10,
              borderWidth: 1,
              width: 36,
              height: 36,
            }}
          >
            <TimeCircle set={"bold"} primaryColor="#46596C" size={26} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#46596C" }}>
              {activeOrder?.walk_service?.name || ""}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#46596C" }}>
              {activeOrder?.walk_service?.duration || ""} წთ
            </Text>
          </View>
        </View>
        <SliderButton
          text={activeOrder.order_status > 2 ? "დასრულება" : "ადგილზე მივედი"}
          onToggle={handleStatusUpdate}
        />
      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({});
