import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useFormik } from "formik";

import { appStateProvider } from "../../store/appState";
import { languageProvider } from "../../store/language";
import { userProvider } from "../../store/auth";
import { userDataProvider } from "../../store/userData";
import { signIn } from "../../store/actions/user";

import { lc } from "./content/login";
import logo from "../../assets/images/doggo-icon-img.png";

import AuthInput from "../shared/inputs/AuthInput";
import BtnFill from "../shared/buttons/BtnFill";

const LoginScreen = ({ navigation }) => {
  const { loading, setLoading } = appStateProvider();

  const { language } = languageProvider();
  const ln = lc[language];

  const { setCurrentUser } = userProvider();
  const { setDogs, setCards, setWalkOrders } = userDataProvider();

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = ln.err.email.empty;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = ln.err.email.reg;
    }
    if (!values.password) {
      errors.password = ln.err.password.empty;
    } else if (values.password.length < 8) {
      errors.password = ln.err.password.length;
    }
    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // formik.setValues({ ...values, password: "" });
    setSubmitting(true);
    signIn(
      {
        email: values.email,
        password: values.password,
      },
      setCurrentUser,
      setSubmitting,
      setLoading,
      setDogs,
      setCards,
      setWalkOrders
    );
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validate,
    onSubmit: handleSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={[styles.container, { paddingHorizontal: 24 }]}
      >
        <Image source={logo} style={styles.logo} />
        {formik.errors.email && (
          <Text style={styles.errMsg}>{formik.errors.email}</Text>
        )}
        <AuthInput
          type="text"
          placeholder={ln.username}
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          error={formik.errors.email ? true : false}
        />
        {formik.errors.password && (
          <Text style={styles.errMsg}>{formik.errors.password}</Text>
        )}
        <AuthInput
          type="password"
          placeholder={ln.password}
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          error={formik.errors.password ? true : false}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Reset")}>
          <Text style={{ fontSize: 14, color: "#46596C" }}>{ln.recover}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={styles.botComtainer}>
        {/* <View style={styles.btnContainer}>
          <BtnOut
            title="facebook"
            ico={<FontAwesome name="facebook" size={17} color="#3CBF77" />}
          />
          <BtnOut
            title="google"
            ico={<FontAwesome name="google" size={17} color="#3CBF77" />}
          />
        </View> */}

        <BtnFill
          title={ln.login}
          st={{ marginVertical: 30 }}
          callback={formik.handleSubmit}
          disabled={formik.isSubmitting}
        />
        <TouchableOpacity
          style={Platform.OS == "ios" ? {} : { marginBottom: 20 }}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={{ fontSize: 16, color: "#46596C" }}>{ln.reg}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botComtainer: {
    marginTop: "auto",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
  },
  logo: { width: 155, height: 155, marginTop: 50, marginBottom: 20 },
  errMsg: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
    marginLeft: 8,
  },
});
