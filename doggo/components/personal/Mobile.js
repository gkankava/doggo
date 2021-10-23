import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFormik } from "formik";

import { languageProvider } from "../../store/language";

import AuthInput from "../shared/inputs/AuthInput";
import BtnFill from "../shared/buttons/BtnFill";

const Mobile = () => {
  const { language } = languageProvider();

  const validate = (values) => {
    const errors = {};
    if (!values.phone) {
      errors.phone =
        language === "en" ? "This field is required" : "შეავსეთ ველი";
    }
    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 2000);
  };

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validate: validate,
    onSubmit: handleSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <View style={styles.container}>
      {formik.errors.phone && (
        <Text style={styles.errMsg}>{formik.errors.phone}</Text>
      )}
      <AuthInput
        type="phone"
        placeholder={language === "en" ? "Phone number" : "ტელეფონის ნომერი"}
        value={formik.values.phone}
        onChangeText={formik.handleChange("phone")}
        onBlur={formik.handleBlur("phone")}
        error={formik.errors.phone ? true : false}
      />
      <BtnFill
        title={language === "en" ? "Save" : "შენახვა"}
        st={{ marginTop: "auto", marginBottom: 30 }}
        callback={formik.handleSubmit}
        disabled={formik.isSubmitting}
      />
    </View>
  );
};

export default Mobile;

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
