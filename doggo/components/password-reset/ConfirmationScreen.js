import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import CodeInput from "react-native-confirmation-code-input";

import { languageProvider } from "../../store/language";
import { cs } from "./content/confirm";

import {
  getVerificationCode,
  checkVerificationCode,
} from "../../store/actions/verification";

import BtnFill from "../shared/buttons/BtnFill";

const ConfirmationScreen = ({ navigation, ...params }) => {
  const { width } = useWindowDimensions();
  const isSignUp = params.route.params.isSignUp;
  const values = params.route.params.values;
  const { language } = languageProvider();
  const ln = cs[language];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    getVerificationCode(values.phone);
  }, []);

  const handleSubmit = () => {
    if (code.length === 6) {
      checkVerificationCode(code, values.phone, () => {
        navigation.navigate("NewPassword", { isSignUp, values });
      });
    }
    setCode("");
  };
  let s = width / 8;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.string}>{ln.info}</Text>
      <CodeInput
        className={"border-box"}
        space={width / 40}
        size={width / 8}
        inputPosition="center"
        activeColor="#3CBF77"
        inactiveColor="#F6FBF6"
        autoFocus={true}
        keyboardType="numeric"
        codeLength={6}
        cellBorderWidth={2}
        codeInputStyle={{
          fontWeight: "400",
          color: "#3CBF77",
          fontSize: 20,
          backgroundColor: "#F6FBF6",
          borderRadius: 16,
        }}
        onFulfill={(code) => {
          setCode(code);
        }}
      />
      <View style={styles.botContainer}>
        <TouchableOpacity>
          <Text style={{ color: "#3CBF77", fontWeight: "500", fontSize: 16 }}>
            {ln.resend}
          </Text>
        </TouchableOpacity>
        <BtnFill
          title={ln.confirm}
          st={{ marginVertical: 30 }}
          callback={handleSubmit}
          // disabled={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  string: {
    paddingTop: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 20,
  },
  errMsg: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
    marginLeft: 8,
  },
  botContainer: {
    marginTop: "auto",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
});
