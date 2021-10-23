import React from "react";
import { TouchableOpacity } from "react-native";
import { ChevronLeft } from "react-native-iconly";
import { useNavigation } from "@react-navigation/native";

const HeaderBackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: 42,
        height: 42,
        borderColor: "#E8E8E8",
        borderWidth: 1,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => navigation.goBack()}
    >
      <ChevronLeft set="two-tone" primaryColor="#3CBF77" size={30} />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
