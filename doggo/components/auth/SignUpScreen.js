// POST auth birthday field missing

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useFormik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";

import { languageProvider } from "../../store/language";
import { rc } from "./content/register";

import AuthInput from "../shared/inputs/AuthInput";
import BtnFill from "../shared/buttons/BtnFill";
import BtnOut from "../shared/buttons/BtnOut";

import { FontAwesome } from "@expo/vector-icons";
import { Calendar } from "react-native-iconly";

import { signUp } from "../../store/actions/user";

const SignUpScreen = ({ navigation }) => {
  const { language } = languageProvider();
  const ln = rc[language];

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = ln.err.email.empty;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = ln.err.email.reg;
    }
    if (!values.name) {
      errors.name = ln.err.name.empty;
    }
    if (!values.phone) {
      errors.phone = ln.err.phone.empty;
    }
    if (!changed) {
      errors.birth = ln.err.birth.empty;
    }
    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    navigation.navigate("Reset", {
      screen: "Confirmation",
      params: { isSignUp: true, values },
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validate: validate,
    onSubmit: handleSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [changed, setChanged] = useState(false);

  const onChange = (event, selectedDate) => {
    setChanged(true);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{ln.title}</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={[styles.container, { paddingHorizontal: 24 }]}
      >
        {formik.errors.name && (
          <Text style={styles.errMsg}>{formik.errors.name}</Text>
        )}
        <AuthInput
          type="text"
          placeholder={ln.name}
          value={formik.values.name}
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          error={formik.errors.name ? true : false}
        />
        {formik.errors.email && (
          <Text style={styles.errMsg}>{formik.errors.email}</Text>
        )}
        <AuthInput
          type="email"
          placeholder={ln.email}
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          error={formik.errors.email ? true : false}
        />
        {formik.errors.phone && (
          <Text style={styles.errMsg}>{formik.errors.phone}</Text>
        )}
        <AuthInput
          type="phone"
          placeholder={ln.phone}
          value={formik.values.phone}
          onChangeText={formik.handleChange("phone")}
          onBlur={formik.handleBlur("phone")}
          error={formik.errors.phone ? true : false}
        />
        {/* 
        <AuthInput
          type="birth"
          placeholder={ln.birth}
          value={formik.values.birth}
          onChangeText={formik.handleChange("birth")}
          onBlur={formik.handleBlur("birth")}
          error={formik.errors.birth ? true : false}
        /> */}
        {formik.errors.birth && (
          <Text style={styles.errMsg}>{formik.errors.birth}</Text>
        )}
        <TouchableOpacity
          style={[
            styles.binpContainer,
            {
              borderColor: formik.errors.birth ? "#D98383" : "fff",
              borderWidth: formik.errors.birth ? 1 : 0,
            },
          ]}
          onPress={() => setShow(!show)}
        >
          <Calendar set="bold" primaryColor="#3CBF77" />
          <Text style={styles.binpText}>
            {changed
              ? date.toLocaleString("en-us", { dateStyle: "medium" })
              : ln.birth}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Reset")}>
          <Text style={{ fontSize: 14, color: "#46596C" }}>{ln.recover}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={styles.botComtainer}>
        {show ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            display="spinner"
            onChange={onChange}
            style={{
              width: "100%",
              backgroundColor: "white",
              zIndex: 100,
            }}
          />
        ) : (
          <>
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
              title={ln.btn}
              st={{ marginVertical: 30 }}
              callback={formik.handleSubmit}
              disabled={formik.isSubmitting}
            />
            <TouchableOpacity
              style={Platform.OS == "ios" ? {} : { marginBottom: 20 }}
              onPress={() => navigation.navigate("Login")}
            >
              <Text
                style={{ fontSize: 18, color: "#46596C", fontWeight: "600" }}
              >
                {ln.login}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const sh = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    color: "#3CBF77",
    marginVertical: 50,
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
  binpContainer: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 0,
    // paddingVertical: 15,
    borderRadius: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: "#F6FBF6",
    minHeight: 45,
    height: sh * 0.069,
  },
  binpText: {
    fontSize: 14,
    color: "#B5C8DB",
    width: "80%",
    marginHorizontal: 5,
    flexGrow: 1,
  },
});
