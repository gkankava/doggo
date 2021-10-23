import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Star } from "react-native-iconly";

import { walkOrderProvider } from "../../../store/walkOrder";
import { fetchWalkers } from "../../../store/actions/walkServices";

const Choose = ({
  language,
  setBsState,
  selectedWalker,
  setSelectedWalker,
}) => {
  const { walkers, setWalkers } = walkOrderProvider();

  useEffect(() => {
    fetchWalkers(setWalkers);
  }, []);

  useEffect(() => {
    walkers.length > 0 && console.log(walkers);
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
        <>
          <Star set="light" primaryColor="#3CBF77" size={15} />
          <Star set="light" primaryColor="#3CBF77" size={15} />
          <Star set="light" primaryColor="#3CBF77" size={15} />
          <Star set="light" primaryColor="#3CBF77" size={15} />
          <Star set="light" primaryColor="#3CBF77" size={15} />
        </>
      );
    }
  };

  return (
    <>
      {walkers.length > 0 &&
        walkers.map((i, k) => {
          return (
            <TouchableOpacity
              key={k}
              style={styles.container}
              onPress={() => {
                setSelectedWalker(i);
                setBsState({ isActive: false, com: null });
              }}
            >
              <Image
                source={require("../../../assets/images/default.jpeg")}
                style={styles.image}
              />
              <View style={styles.detContainer}>
                <Text style={styles.name}>{i.name}</Text>
                <View style={styles.ratingContainer}>
                  {renderRating(i.rating)}
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderWidth: selectedWalker?.id === i.id ? 5 : 1,
                  borderColor: "#3CBF77",
                }}
              />
            </TouchableOpacity>
          );
        })}
    </>
  );
};

export default Choose;

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 18,
  },
  image: {
    height: height * 0.08,
    width: height * 0.08,
    borderRadius: 18,
    resizeMode: "contain",
  },
  detContainer: { marginLeft: 20, marginRight: "auto" },
  name: {
    fontSize: 18,
    color: "#3CBF77",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
  },
});
