import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";

import slides from "./slides";
import Paginator from "./Paginator";
import Slide from "./Slide";

import { languageProvider } from "../../store/language";

const Slider = () => {
  const { language, setLanguage } = languageProvider();

  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const slideRef = useRef(null);

  const scrollToNext = () => {
    if (currentIndex < slides.length - 1) {
      slideRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      storeData("false");
      setFirst(false);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <Slide item={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        ref={slideRef}
        scrollEnabled={true}
      />
      <Paginator data={slides} scrollX={scrollX} />
      {/* <View style={styles.bottom}></View> */}
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bottom: {
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
});
