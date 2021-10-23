import React from "react";
import { StyleSheet, Text, SafeAreaView, Image } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

const Slide = ({ t, img }) => {
  const video = React.useRef(null);

  React.useEffect(() => {
    video?.current?.playAsync();
  }, [video]);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.img} source={img} />
      {/* <Video
        ref={video}
        style={styles.img}
        source={require("../../../assets/video/searchAnim.mp4")}
        useNativeControls={false}
        resizeMode="cover"
        isLooping
        muted={true}
        ignoreSilentSwitch={"obey"}
      /> */}
      <Text style={styles.txt}>{t}</Text>
    </SafeAreaView>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  img: {
    height: "45%",
    width: "80%",
    marginBottom: 20,
    resizeMode: "contain",
    // backgroundColor: "white",
  },
  txt: {
    width: "80%",
    fontSize: 18,
    fontWeight: "500",
    color: "#46596C",
    textAlign: "center",
    marginBottom: "50%",
  },
});
