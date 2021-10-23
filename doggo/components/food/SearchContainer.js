import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import SearchInput from "./SearchInput";
import Filter from "./Filter";

const SearchContainer = ({ val, setVal, bs, scroll }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={scroll}
    >
      <SearchInput val={val} setVal={setVal} scroll={scroll} />
      <Filter bs={bs} />
    </TouchableOpacity>
  );
};

export default SearchContainer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 42,
  },
});
