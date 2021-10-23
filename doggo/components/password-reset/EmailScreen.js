import React from "react";
import { useFormik } from "formik";
import { View, Text, StyleSheet } from "react-native";
import { languageProvider } from "../../store/language";
import { ec } from "./content/email";

import AuthInput from "../shared/inputs/AuthInput";
import BtnFill from "../shared/buttons/BtnFill";

const EmailScreen = ({ navigation }) => {
  const { language } = languageProvider();
  const ln = ec[language];

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = ln.err.email.empty;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = ln.err.email.reg;
    }
    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      navigation.navigate("Confirmation");
    }, 2000);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: validate,
    onSubmit: handleSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.string}>{ln.email}</Text>
      {formik.errors.email && (
        <Text style={styles.errMsg}>{formik.errors.email}</Text>
      )}
      <AuthInput
        type="text"
        placeholder={ln.input}
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        error={formik.errors.email ? true : false}
      />
      <BtnFill
        title={ln.send}
        st={{ marginTop: "auto", marginBottom: 30 }}
        callback={formik.handleSubmit}
        disabled={formik.isSubmitting}
      />
    </View>
  );
};

export default EmailScreen;

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
