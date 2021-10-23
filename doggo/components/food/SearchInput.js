import React from "react";
import { StyleSheet, TextInput, View, Dimensions } from "react-native";
import { Search } from "react-native-iconly";

const SearchInput = ({ val, setVal, scroll }) => {
  return (
    <View style={styles.container}>
      <Search set="bold" primaryColor="#3CBF77" />
      <TextInput
        style={styles.inputS}
        onChangeText={(data) => setVal(data)}
        value={val}
        placeholder={"ძებნა"}
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={scroll}
      />
    </View>
  );
};

export default SearchInput;

const sh = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flexDirection: "row",
    borderWidth: 0,
    borderRadius: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F6FBF6",
    minHeight: 45,
    height: sh * 0.069,
  },
  inputS: {
    fontSize: 14,
    color: "#B5C8DB",
    width: "80%",
    marginHorizontal: 10,
    flexGrow: 1,
    // color: "#3A3A3C",
  },
});
