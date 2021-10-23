import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HeaderCloseButton = ({ setIsActive }) => {
  return (
    <TouchableOpacity
      style={{
        width: 42,
        height: 42,
        borderColor: "#CCF2D7",
        borderWidth: 1,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0FFEF",
      }}
      onPress={() => setIsActive(false)}
    >
      <AntDesign name="close" size={20} color="#3CBF77" />
    </TouchableOpacity>
  );
};

export default HeaderCloseButton;
