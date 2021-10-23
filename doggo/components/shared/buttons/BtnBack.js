import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BtnBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={require("../../../assets/icons/back.png")} />
    </TouchableOpacity>
  );
};

export default BtnBack;
