import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFormik } from "formik";

import { userProvider } from "../../store/auth";
import { updatePassword } from "../../store/actions/user";
import { languageProvider } from "../../store/language";
import { rc } from "./content/reset";

import AuthInput from "../shared/inputs/AuthInput";
import BtnFill from "../shared/buttons/BtnFill";

const Reset = ({ navigation }) => {
  const { language } = languageProvider();
  const ln = rc[language];

  const { currentUser } = userProvider();

  const validate = (values) => {
    const errors = {};
    if (!values.pass) {
      errors.pass = ln.empty;
    }
    if (!values.newPass) {
      errors.newPass = ln.empty;
    }
    if (values.newPass.length < 8) {
      errors.newPass = ln.reg;
    }
    if (!values.rePass) {
      errors.rePass = ln.empty;
    }
    if (values.newPass !== values.rePass) {
      errors.rePass = ln.match;
    }
    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    let body = {
      old_password: values.pass,
      password: values.newPass,
      password_confirmation: values.rePass,
    };
    updatePassword(currentUser.user.id, body, setSubmitting, () =>
      navigation.goBack()
    );
  };

  const formik = useFormik({
    initialValues: {
      pass: "",
      newPass: "",
      rePass: "",
    },
    validate: validate,
    onSubmit: handleSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  });
  return (
    <View style={styles.container}>
      {formik.errors.pass && (
        <Text style={styles.errMsg}>{formik.errors.pass}</Text>
      )}
      <AuthInput
        type="password"
        placeholder={language === "en" ? "Old password" : "ძველი პაროლი"}
        value={formik.values.pass}
        onChangeText={formik.handleChange("pass")}
        onBlur={formik.handleBlur("pass")}
        error={formik.errors.pass ? true : false}
      />
      {formik.errors.newPass && (
        <Text style={styles.errMsg}>{formik.errors.newPass}</Text>
      )}
      <AuthInput
        type="password"
        placeholder={language === "en" ? "New password" : "ახალი პაროლი"}
        value={formik.values.newPass}
        onChangeText={formik.handleChange("newPass")}
        onBlur={formik.handleBlur("newPass")}
        error={formik.errors.newPass ? true : false}
      />
      {formik.errors.rePass && (
        <Text style={styles.errMsg}>{formik.errors.rePass}</Text>
      )}
      <AuthInput
        type="password"
        placeholder={language === "en" ? "Repeat password" : "გაიმეორეთ პაროლი"}
        value={formik.values.rePass}
        onChangeText={formik.handleChange("rePass")}
        onBlur={formik.handleBlur("rePass")}
        error={formik.errors.rePass ? true : false}
      />
      <BtnFill
        title={ln.confirm}
        st={{ marginTop: "auto", marginBottom: 30 }}
        callback={formik.handleSubmit}
        disabled={formik.isSubmitting}
      />
    </View>
  );
};

export default Reset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  errMsg: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
    marginLeft: 8,
  },
});
