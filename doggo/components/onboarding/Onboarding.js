import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import slides from "./Slides";
import OnBoardingItem from "./OnBoardingItem";
import Paginator from "./Paginator";
import PageBtn from "./PageBtn";

import { languageProvider } from "../../store/language";

const Onboarding = ({ setFirst }) => {
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

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("first", value);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.languageSelector}
        onPress={() => {
          if (language === "en") {
            setLanguage("ge");
          } else setLanguage("en");
        }}
      >
        <Text style={{ fontSize: 12, color: "#3CBF77" }}>
          {language === "en" ? "ქა" : "En"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnBoardingItem item={item} />}
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
      <View style={styles.bottom}>
        <Paginator data={slides} scrollX={scrollX} />
        <PageBtn scrollNext={scrollToNext} currentIndex={currentIndex} />
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  languageSelector: {
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    width: 33,
    height: 33,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    position: "relative",
    zIndex: 10,
    marginRight: 20,
    marginTop: 40,
  },
  bottom: {
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
});
