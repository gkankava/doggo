import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  useWindowDimensions,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import BtnFill from "../shared/buttons/BtnFill";
import { languageProvider } from "../../store/language";

const MapModal = ({
  modalVisible,
  setModalVisible,
  geo,
  setGeo,
  setConfirmed,
}) => {
  const { height, width } = useWindowDimensions();
  const { language } = languageProvider();

  const [state, setState] = useState({
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
  });

  useEffect(() => {
    modalVisible &&
      setState({
        region: {
          latitude: geo.lat,
          longitude: geo.lng,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        },
      });
  }, [modalVisible]);

  const onRegionChange = (region) => {
    setState({ region: region });
  };

  return (
    <Modal
      transparent={false}
      statusBarTranslucent={true}
      visible={modalVisible}
      onRequestClose={() => {
        console.log("closing modal");
      }}
      setModalVisible={() => {
        setModalVisible(false);
      }}
    >
      <View style={[styles.container, { height, width }]}>
        <MapView
          style={[styles.map, { width }]}
          showsUserLocation={true}
          initialRegion={state.region}
          rotateEnabled={false}
          provider="google"
          tracksViewChanges={false}
          onRegionChange={onRegionChange}
          onRegionChangeComplete={(reg) => {
            setGeo({ lat: reg.latitude, lng: reg.longitude });
          }}
        >
          <Marker
            coordinate={{
              latitude: state.region.latitude,
              longitude: state.region.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <Image
              source={require("../../assets/icons/marker.png")}
              style={{ width: 35, height: 35 }}
              resizeMode="contain"
            />
          </Marker>
        </MapView>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            position: "absolute",
            bottom: 60,
          }}
        >
          <BtnFill
            title={language === "en" ? "Confirm" : "დადასტურება"}
            st={{ width: "100%" }}
            callback={() => {
              setConfirmed(true);
              setModalVisible(false);
            }}
            disabled={false}
          />
        </View>
      </View>
    </Modal>
  );
};

export default MapModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  map: {
    flexGrow: 1,
  },
});
