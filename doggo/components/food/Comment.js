import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

const Comment = ({ bs, language, setComment, comment }) => {
  const [com, setCom] = useState("");

  React.useEffect(() => {
    comment.length > 0 && setCom(comment);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{
        paddingBottom: 20,
        paddingTop: 30,
        backgroundColor: "white",
        marginTop: 20,
        minHeight: "80%",
        borderRadius: 18,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          color: "#46596C",
          marginLeft: 20,
          marginBottom: 20,
        }}
      >
        {language === "en" ? "Add Comment" : "დაამატე კომენტარი"}
      </Text>
      <TextInput
        onFocus={() => bs.current.snapTo(2)}
        style={styles.input}
        multiline={true}
        value={com}
        onChangeText={(val) => setCom(val)}
      />
      <TouchableOpacity
        style={{ marginTop: 30 }}
        onPress={() => {
          setComment(com);
          Keyboard.dismiss();
          bs.current.snapTo(0);
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 16, color: "#3CBF77" }}>
          {language === "en" ? "Add" : "დამატება"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Comment;

const styles = StyleSheet.create({
  input: {
    borderRadius: 18,
    padding: 20,
    paddingTop: 20,
    flexGrow: 0,
    minHeight: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    textAlignVertical: "top",
  },
});
