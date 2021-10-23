import React from "react";
import { View, useWindowDimensions, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import MenuItem from "./MenuItem";
import PromoItem from "./PromoItem";

import { languageProvider } from "../../store/language";
import { mc } from "./content/main";

import walk from "../../assets/icons/walk.png";
import saloon from "../../assets/icons/saloon.png";
import food from "../../assets/icons/food.png";
import hotel from "../../assets/icons/hotel.png";

// import Constants from "expo-constants"; Constants.linkingUri

const Menu = () => {
  const { language } = languageProvider();
  const ln = mc[language];
  const { height } = useWindowDimensions();

  return (
    <View
      style={{
        height: height * 0.88 - 118,
        marginTop: 0,
        backgroundColor: "white",
      }}
    >
      <MenuItem
        route={"Walk"}
        title={ln.walk.title}
        info={ln.walk.info}
        img={walk}
        bgin={"#80B918"}
        bgout={"#55A630"}
        z={10}
      />
      <MenuItem
        route={"FoodStack"}
        title={ln.food.title}
        info={ln.food.info}
        img={saloon}
        bgin={"#55A630"}
        bgout={"#308D42"}
        z={9}
      />
      <MenuItem
        route={"Saloons"}
        title={ln.saloon.title}
        info={ln.saloon.info}
        img={food}
        bgin={"#308D42"}
        bgout={"#1F8132"}
        z={8}
        disabled={true}
      />
      <MenuItem
        route={"Hotels"}
        title={ln.hotel.title}
        info={ln.hotel.info}
        img={hotel}
        bgin={"#1F8132"}
        bgout={"white"}
        z={7}
        disabled={true}
      />

      {/* <PromoItem
        title={ln.offers.title}
        info={ln.hotel.info}
        bg={"#3CBF77"}
        z={1}
      /> */}
    </View>
  );
};

export default Menu;
