import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { ArrowRight } from "react-native-iconly";

import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  interpolateColor,
  runOnJS,
} from "react-native-reanimated";
import { useState } from "react";

const SliderButton = ({ text, onToggle }) => {
  const X = useSharedValue(0);
  const [toggled, setToggled] = React.useState(false);

  const handleComplete = (isToggled) => {
    if (isToggled !== toggled) {
      setToggled(false);
      onToggle();
    }
  };

  const handleGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.completed = toggled;
    },
    onActive: (e, ctx) => {
      let newVal;
      if (ctx.completed) {
        newVal = H_SWIPE_RANGE + e.translationX;
      } else {
        X.value = e.translationX;
      }
      if (newVal >= 0 && newVal <= H_SWIPE_RANGE) {
        X.value = newVal;
      }
    },
    onEnd: (e) => {
      if (X.value < BTN_WIDTH / 2 - SWP_DIMENSIONS / 2) {
        X.value = 0;
        runOnJS(handleComplete)(false);
      } else {
        X.value = H_SWIPE_RANGE;
        runOnJS(handleComplete)(true);
      }
    },
  });

  const animatedStyle = {
    swipeable: useAnimatedStyle(() => {
      return {
        transform: [{ translateX: X.value }],
      };
    }),
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <Animated.View style={[styles.swipeable, animatedStyle.swipeable]}>
          <ArrowRight set={"bold"} primaryColor="white" size={24} />
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default SliderButton;

const { width } = Dimensions.get("screen");

const BTN_HEIGHT = 80;
const BTN_WIDTH = width - 40;
const BTN_PADDING = 5;
const SWP_DIMENSIONS = BTN_HEIGHT - 2 * BTN_PADDING;
const H_SWIPE_RANGE = BTN_WIDTH - 2 * BTN_PADDING - SWP_DIMENSIONS;

const styles = StyleSheet.create({
  container: {
    marginTop: "auto",
    height: BTN_HEIGHT,
    width: BTN_WIDTH,
    //  alignItems: "center",
    borderRadius: 18,
    backgroundColor: "#F8F8F9",
    justifyContent: "center",
  },
  swipeable: {
    height: SWP_DIMENSIONS,
    width: SWP_DIMENSIONS,
    marginLeft: 5,
    backgroundColor: "#43BE79",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    zIndex: 10,
  },
  textContainer: {
    position: "absolute",
    height: BTN_HEIGHT,
    width: "100%",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3CBF77",
    zIndex: 4,
  },
});
