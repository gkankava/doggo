import React, { useState } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

import SearchContainer from "./SearchContainer";
import CategoryMenu from "./CategoryMenu";
import List from "./List";

const Content = ({ bs, scroll }) => {
  const [searchVal, setSearchVal] = useState("");
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState("");

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 150 }}
      style={styles.container}
    >
      <Text style={styles.title}>Doggo Store</Text>
      <SearchContainer
        scroll={scroll}
        val={searchVal}
        setVal={setSearchVal}
        bs={bs}
      />
      {/* searching ? false : true  */}
      <CategoryMenu selected={selected} setSelected={setSelected} />
      <List selected={selected} />
    </ScrollView>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "white",
  },
  title: {
    color: "#3CBF77",
    fontSize: 32,
    fontWeight: "400",
    alignSelf: "center",
  },
});
