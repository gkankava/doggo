import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

import { shopProvider } from "../../store/products";
import { fetchCategories, fetchProducts } from "../../store/actions/shop";

const CategoryMenu = ({ selected, setSelected }) => {
  const { categories, setCategories, setProducts } = shopProvider();
  useEffect(() => {
    fetchCategories(setCategories);
    fetchProducts(setProducts);
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setSelected(categories[0].id);
    }
  }, [categories]);

  return (
    <View>
      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((c, k) => (
          <TouchableOpacity
            key={k.toString()}
            activeOpacity={0.9}
            style={[
              styles.item,
              {
                backgroundColor: selected === c.id ? "#3CBF77" : "#F6FBF6",
              },
            ]}
            onPress={() => {
              setSelected(c.id);
            }}
          >
            <Text
              style={[
                styles.txt,
                { color: selected === c.id ? "white" : "#3CBF77" },
              ]}
            >
              {c.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryMenu;

const styles = StyleSheet.create({
  item: {
    marginTop: 20,
    width: 130,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  txt: {
    fontSize: 14,
    fontWeight: "600",
  },
});
