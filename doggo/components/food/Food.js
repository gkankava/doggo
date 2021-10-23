import React, { createRef, useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

import { languageProvider } from "../../store/language";
import { shopProvider } from "../../store/products";

import BtnBack from "../shared/buttons/BtnBack";

import Header from "./Header";
import Content from "./Content";

import BsHeader from "../main/BsHeader";
import BsContent from "./BsContent";
import Prompt from "./Prompt";

const Food = ({ navigation }) => {
  const { language } = languageProvider();
  const { height } = useWindowDimensions();

  const bs = createRef();
  const sv = useRef();

  const fall = new Animated.Value(1);
  const scrollY = new Animated.Value(0);

  const [isOrder, setIsorder] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [event, setEvent] = useState(null);

  const { order } = shopProvider();

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (order.products.length === 0) {
          return;
        }
        e.preventDefault();
        setPrompt(true);
        setEvent(e.data.action);
      }),
    [navigation, order]
  );

  const opacity = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [0.9, 1, 0],
    extrapolate: "clamp",
  });
  const scale = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1.2, 1, 0.8],
    extrapolate: "clamp",
  });
  const bg = scrollY.interpolate({
    inputRange: [-500, height * 0.4557 - 130.0001, height * 0.4557 - 130],
    outputRange: [
      Animated.color(242, 242, 242),
      Animated.color(242, 242, 242),
      Animated.color(255, 255, 255),
    ],
    extrapolate: "clamp",
  });

  const focusSearch = (sv) => {
    sv.current.scrollTo({
      x: 0,
      y: height * 0.4557 - 100,
      animated: true,
    });
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { backgroundColor: "white" }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <BtnBack />
        </View>
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ])}
        scrollEventThrottle={1}
        style={{ backgroundColor: bg }}
        ref={sv}
      >
        <Header opacity={opacity} scale={scale} />
        <Content scroll={() => focusSearch(sv)} bs={bs} />
      </Animated.ScrollView>
      {order.products.length > 0 && (
        <View
          style={{
            position: "absolute",
            bottom: 50,
            width: "100%",
            height: 62,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              backgroundColor: "#3CBF77",
              width: "100%",
              height: 62,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 16,
            }}
            onPress={() => navigation.navigate("Date")}
          >
            <Text style={{ color: "white", fontWeight: "700", fontSize: 15 }}>
              გადახდაზე გადასვლა
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <BottomSheet
        ref={bs}
        snapPoints={[0, height * 0.7]}
        initialSnap={0}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledInnerScrolling={true}
        enabledContentTapInteraction={false}
        renderHeader={() => <BsHeader />}
        renderContent={() => <BsContent />}
      />

      <Prompt
        navigation={navigation}
        e={event}
        setE={setEvent}
        close={() => setPrompt(false)}
        p={prompt}
      />
    </View>
  );
};

export default Food;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
  },
  header: {
    height: 130,
    elevation: 0,
    shadowOpacity: 0,
    width: "100%",
    justifyContent: "flex-end",
    paddingBottom: 30,
    paddingLeft: 20,
  },
});
