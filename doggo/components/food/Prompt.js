import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";

import { languageProvider } from "../../store/language";
import { pc } from "./content/prompt";

import BtnFill from "../shared/buttons/BtnFill";

const Prompt = ({ navigation, e, setE, close, p }) => {
  const { language } = languageProvider();
  const ln = pc[language];

  return (
    <Modal
      animationType="fade"
      transparent={false}
      statusBarTranslucent={true}
      visible={p}
      onRequestClose={() => {
        console.log("closing modal");
      }}
    >
      <View style={[styles.container]}>
        <View style={styles.inner}>
          <Image
            style={styles.image}
            source={require("../../assets/artworks/delete.png")}
          />
          <Text
            style={{
              fontSize: 15,
              color: "#46596C",
              fontWeight: "500",
              textAlign: "center",
              marginBottom: "auto",
            }}
          >
            {ln.msg}
          </Text>
          <BtnFill
            title={ln.confirm}
            st={{ marginBottom: 20 }}
            callback={() => {
              navigation.dispatch(e);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setE(null);
              close();
            }}
          >
            <Text>{ln.cancel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Prompt;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  inner: {
    borderRadius: 18,
    width: "80%",
    height: "60%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    marginBottom: 20,
  },
});
