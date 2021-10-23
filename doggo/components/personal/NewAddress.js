import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import { CircleSnail } from "react-native-progress";

import { userProvider } from "../../store/auth";
import { languageProvider } from "../../store/language";
import { nac } from "./content/newAddress";

import { userDataProvider } from "../../store/userData";
import { addAddress, updateDefaultAddress } from "../../store/actions/address";

import AuthInput from "../shared/inputs/AuthInput";
import BtnFill from "../shared/buttons/BtnFill";
import MapModal from "./MapModal";

const GOOGLE_PACES_API_BASE_URL = "https://maps.googleapis.com/maps/api/place";
const GOOGLE_API_KEY = "AIzaSyBDBMD0rbIw0W6nwg_iRzWHTrRSrdb4gfc";
const GOOGLE_GEOCODING_API_KEY = "AIzaSyBPo0b9pdpL9D_BxeB3VfcMyFUuM3a545U";

const NewAddress = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const { language } = languageProvider();
  const ln = nac[language];

  const { currentUser } = userProvider();

  const { addresses, setAddresses } = userDataProvider();

  const [location, setLocation] = useState(null);

  const [search, setSearch] = useState({ term: "", fetchPredictions: false });
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [geo, setGeo] = useState({ lat: 0, lng: 0 });
  const [confirmed, setConfirmed] = useState(false);
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [inputDisabled, setInputDisabled] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      await Location.getLastKnownPositionAsync({})
        .then(async (location) => {
          if (location === null) {
            let cla = await Location.getCurrentPositionAsync({});
            setLocation(cla);
            setInputDisabled(false);
          } else {
            setLocation(location);
            setInputDisabled(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  useEffect(() => {
    reverseGeocoding();
  }, [geo]);

  useEffect(() => {
    searchAsync();
  }, [search.term]);

  const reverseGeocoding = async () => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_GEOCODING_API_KEY}&latlng=${geo.lat},${geo.lng}&result_type=street_address`;
    try {
      const result = await axios.request({
        method: "post",
        url: apiUrl,
      });
      if (result) {
        if (result.data.results.length > 0) {
          let calculatedName = result.data.results[0].formatted_address;
          setName(calculatedName);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const searchAsync = async () => {
    if (search.term.trim() === "") return;
    if (!search.fetchPredictions) return;
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_API_KEY}&input=${search.term}&location=${location.coords.latitude},${location.coords.longitude}&radius=100`;
    try {
      const result = await axios.request({
        method: "post",
        url: apiUrl,
      });
      if (result) {
        const {
          data: { predictions },
        } = result;
        setPredictions(predictions);
        setShowPredictions(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onPredictionTapped = async (placeId, description) => {
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${GOOGLE_API_KEY}&place_id=${placeId}`;
    try {
      const result = await axios.request({
        method: "post",
        url: apiUrl,
      });
      if (result) {
        const {
          data: {
            result: {
              geometry: { location },
            },
          },
        } = result;
        const { lat, lng } = location;
        setShowPredictions(false);
        setSearch({ term: description });
        setGeo({ lat, lng });
        setModalVisible(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const __renderPredictions = (predictions) => (
    <View style={styles.predContainer}>
      <FlatList
        data={predictions}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onPredictionTapped(item.place_id, item.description);
                setShowMap(true);
              }}
              style={styles.predItem}
            >
              <Text style={styles.predTxt} numberOfLines={1}>
                {item.description}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.place_id}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {inputDisabled ? (
        <View
          style={{
            height: height - 130,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 130,
          }}
        >
          <CircleSnail color={"#3CBF77"} size={70} thickness={4} />
        </View>
      ) : (
        <>
          <Text style={styles.heading}>{ln.heading}</Text>
          <AuthInput
            type="location"
            placeholder={ln.add}
            value={search.term}
            returnKeyType="search"
            onChangeText={(text) => {
              setSearch({ term: text, fetchPredictions: true });
              // onChangeText();
            }}
          />
          {showPredictions && __renderPredictions(predictions)}
          {confirmed && (
            <AuthInput
              type="location"
              placeholder={ln.det}
              value={details}
              returnKeyType="search"
              onChangeText={(text) => {
                setDetails(text);
              }}
            />
          )}
          {confirmed && (
            <BtnFill
              title={ln.btn}
              st={{ marginTop: "auto", marginBottom: 30 }}
              callback={() => {
                navigation.goBack();
                setLoading(true);
                addAddress(
                  currentUser.user.id,
                  {
                    name: name,
                    longitude: geo.lng,
                    latitude: geo.lat,
                    comment: details,
                  },
                  setLoading,
                  addresses,
                  setAddresses
                );
              }}
              disabled={loading}
            />
          )}

          <MapModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            geo={geo}
            setGeo={setGeo}
            setConfirmed={setConfirmed}
          />
        </>
      )}
    </View>
  );
};

export default NewAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 12,
    fontWeight: "600",
    color: "#46596C",
    marginBottom: 20,
  },
  predContainer: {
    backgroundColor: "#F6FBF6",
    padding: 10,
    borderRadius: 18,
  },
  predItem: {
    marginBottom: 12,
  },
  predTxt: {
    color: "#46596C",
    fontSize: 14,
    fontWeight: "600",
  },
});
