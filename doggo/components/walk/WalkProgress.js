import React, { createRef, useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import MapView, { Marker } from "react-native-maps";
import { Call, Star } from "react-native-iconly";
import * as Linking from "expo-linking";

import OrderProgress from "./status/OrderProgress";
import { walkOrderProvider } from "../../store/walkOrder";
import { fetchWalkers } from "../../store/actions/walkServices";

const WalkProgress = ({ ...props }) => {
  const { height, width } = useWindowDimensions();
  const bs = createRef();
  const fall = new Animated.Value(1);
  const [bsState, setBsState] = useState({ isActive: false, state: null });
  const interval = useRef();

  const [orderActive, setOrderActive] = useState(false);
  const { activeOrder, walkers, setWalkers } = walkOrderProvider();

  const [state, setState] = useState({
    region: {
      latitude: activeOrder?.order?.latitude,
      longitude: activeOrder?.order?.longitude,
      latitudeDelta: 0.15,
      longitudeDelta: 0.15,
    },
  });

  const [cr, setCr] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [selectedWalker, setSelectedWalker] = useState(false);

  useEffect(() => {
    bsState.isActive && bs.current.snapTo(0);
  }, [bsState]);

  useEffect(() => {
    if (activeOrder) {
      if (activeOrder.order.order_status == 0) {
        setOrderActive(false);
      }
      if (activeOrder.order.order_status > 0) {
        setState({
          region: {
            latitude: activeOrder?.order?.latitude || 0,
            longitude: activeOrder?.order?.longitude || 0,
            latitudeDelta: 0.15,
            longitudeDelta: 0.15,
          },
        });
        //setinterval
        //fetch walkers
        interval.current = setInterval(() => {
          fetchWalkers(setWalkers);
        }, 2000);
      }
    }
  }, [activeOrder]);

  useEffect(() => {
    if (walkers && activeOrder) {
      // get walker from active order
      // filter fetched walkers
      // get / set location from fetched walker
      let walker = walkers.filter((i) => i.id === activeOrder.order.walker_id);
      if (walker.length > 0) {
        setCr({
          latitude: walker[0].location_latitude,
          longitude: walker[0].location_longitude,
        });
        if (!selectedWalker) {
          setSelectedWalker(walker[0]);
        }
      }
    }
  }, [walkers]);

  const renderRating = (rating) => {
    let ratingToRender = [];
    if (rating) {
      for (let i = 0; i < rating; i++) {
        ratingToRender.push(
          <Star
            key={i.toString()}
            set="bold"
            primaryColor="#3CBF77"
            size={15}
          />
        );
      }
      return ratingToRender;
    } else {
      return (
        <View style={{ flexDirection: "row" }}>
          <Star set="light" primaryColor="white" size={15} />
          <Star set="light" primaryColor="white" size={15} />
          <Star set="light" primaryColor="white" size={15} />
          <Star set="light" primaryColor="white" size={15} />
          <Star set="light" primaryColor="white" size={15} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {orderActive ? (
        <>
          <MapView
            style={[styles.map, { width, height: height * 0.7 }]}
            showsUserLocation={true}
            initialRegion={state.region}
            rotateEnabled={false}
            provider="google"
            tracksViewChanges={false}
            // onRegionChange={onRegionChange}
          >
            <Marker
              coordinate={{
                latitude: activeOrder?.order?.latitude || 44,
                longitude: activeOrder?.order?.longitude || 41,
              }}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <Image
                source={require("../../assets/icons/marker.png")}
                style={{ width: 35, height: 35 }}
                resizeMode="contain"
              />
            </Marker>

            <Marker
              coordinate={{
                latitude: cr.latitude,
                longitude: cr.longitude,
              }}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <View
                style={{
                  width: 27,
                  height: 27,
                  borderRadius: 27 / 2,
                  backgroundColor: "#3CBF77",
                  borderWidth: 5,
                  borderColor: "white",
                }}
              />
            </Marker>
          </MapView>

          <BottomSheet
            ref={bs}
            snapPoints={[height * 0.35, height * 0.5]}
            initialSnap={0}
            callbackNode={fall}
            enabledGestureInteraction={true}
            enabledInnerScrolling={true}
            enabledContentTapInteraction={false}
            onCloseEnd={() => setBsState({ isActive: false, state: null })}
            enabledBottomClamp={true}
            renderHeader={() => (
              <View
                style={{
                  height: 86,
                  width: "100%",
                  backgroundColor: "#3CBF77",
                }}
              >
                <View
                  style={{
                    width: 60,
                    height: 6,
                    backgroundColor: "#9EDFBB",
                    borderRadius: 18,
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../assets/images/default.jpeg")}
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 18,
                      marginLeft: 20,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "column",
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "500",
                        marginBottom: 5,
                      }}
                    >
                      {selectedWalker.name || ""}
                    </Text>
                    {renderRating(selectedWalker.rating)}
                  </View>
                  <TouchableOpacity
                    style={{
                      marginLeft: "auto",
                      marginRight: 20,
                      backgroundColor: "#46596C",
                      borderRadius: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 7,
                    }}
                    // onPress={() => {
                    //   selectedWalker && Linking.openURL(`tel:+995555951717`);
                    // }}
                  >
                    <Call set="bulk" primaryColor="white" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            renderContent={() => (
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  minHeight: "100%",
                }}
              ></View>
            )}
          />
        </>
      ) : (
        <OrderProgress
          setOrderActive={setOrderActive}
          navigation={props.navigation}
        />
      )}
    </View>
  );
};

export default WalkProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
