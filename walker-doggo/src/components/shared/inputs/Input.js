import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
} from "react-native";
import { User, Lock, Show, Hide } from "react-native-iconly";

const AuthInput = ({ type, error, ...rest }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <View
      style={{
        ...styles.inputContainer,
        borderColor: error ? "#D98383" : "fff",
        borderWidth: error ? 1 : 0,
      }}
    >
      {type === "text" ? (
        <User set="bold" primaryColor="#3CBF77" />
      ) : (
        <Lock set="bold" primaryColor="#3CBF77" />
      )}
      <TextInput
        style={styles.inputS}
        secureTextEntry={type === "password" ? !passwordVisible : false}
        autoCapitalize="none"
        autoCorrect={false}
        {...rest}
      />
      {type === "password" && (
        <TouchableWithoutFeedback
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          {passwordVisible ? (
            <Hide set="bold" primaryColor="#3CBF77" size={24} />
          ) : (
            <Show set="bold" primaryColor="#3CBF77" size={24} />
          )}
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default AuthInput;

const sh = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 0,
    borderRadius: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: "#F6FBF6",
    minHeight: 45,
    height: sh * 0.069,
  },
  inputS: {
    fontSize: 14,
    color: "#B5C8DB",
    width: "80%",
    marginHorizontal: 5,
    flexGrow: 1,
  },
});
