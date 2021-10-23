import React, { createRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import panel from "../../assets/images/panel.png";
import icop from "../../assets/icons/dogg-ico.png";

import BsHeader from "./BsHeader";
import BsContent from "./BsContent";

const MainFooter = () => {
  const bs = createRef();
  const { height } = useWindowDimensions();

  const fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <Image source={panel} style={styles.panel} />
      <TouchableOpacity style={styles.btn} onPress={() => bs.current.snapTo(1)}>
        <View style={styles.inner}>
          <Image source={icop} />
        </View>
      </TouchableOpacity>
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
    </View>
  );
};

export default MainFooter;

const styles = StyleSheet.create({
  container: {
    marginTop: "auto",
    position: "relative",
    backgroundColor: "white",
  },
  panel: {
    width: "100%",
    height: 80,
  },
  btn: {
    width: "100%",
    height: 62,
    position: "absolute",
    top: -31,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: 62,
    height: 62,
    backgroundColor: "#3CBF77",
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
  },
});
