import React from "react";
import { useFormik } from "formik";
import { View, Text, StyleSheet } from "react-native";
import { languageProvider } from "../../store/language";
import { npc } from "./content/newPass";

import AuthInput from "../shared/inputs/AuthInput";
import BtnFill from "../shared/buttons/BtnFill";

import { appStateProvider } from "../../store/appState";
import { userProvider } from "../../store/auth";

import { signUp } from "../../store/actions/user";

const NewPasswordScreen = ({ navigation, ...params }) => {
  const { loading, setLoading, setIsSignUpG } = appStateProvider();

  const { setCurrentUser } = userProvider();
  const isSignUp = params.route.params;
  const passedValues = params.route.params.values;
  const { language } = languageProvider();
  const ln = npc[language];

  const validate = (values) => {
    const errors = {};
    if (!values.pass) {
      errors.pass = ln.err.pass.empty;
    } else if (values.pass.length < 8) {
      errors.pass = ln.err.pass.reg;
    }
    if (values.pass !== values.rePass) {
      errors.rePass = ln.err.rePass.reg;
    }
    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    let userData = {
      name: passedValues.name,
      email: passedValues.email,
      phone: passedValues.phone,
      password: values.pass,
      password_confirmation: values.rePass,
    };
    setIsSignUpG(true);
    signUp(userData, setCurrentUser, setSubmitting, setLoading);
  };

  const formik = useFormik({
    initialValues: {
      pass: "",
      rePass: "",
    },
    validate: validate,
    onSubmit: handleSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.string}>{ln.info}</Text>
      {formik.errors.pass && (
        <Text style={styles.errMsg}>{formik.errors.pass}</Text>
      )}
      <AuthInput
        type="password"
        placeholder={ln.pp}
        value={formik.values.pass}
        onChangeText={formik.handleChange("pass")}
        onBlur={formik.handleBlur("pass")}
        error={formik.errors.pass ? true : false}
      />
      {formik.errors.rePass && (
        <Text style={styles.errMsg}>{formik.errors.rePass}</Text>
      )}
      <AuthInput
        type="password"
        placeholder={ln.rpp}
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

export default NewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  string: { fontSize: 16, fontWeight: "400", marginBottom: 20 },
  errMsg: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
    marginLeft: 8,
  },
});
