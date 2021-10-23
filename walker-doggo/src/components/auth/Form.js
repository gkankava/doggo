import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFormik } from "formik";

import Input from "../shared/inputs/Input";
import Button from "../shared/buttons/Button";

import { userProvider } from "../../store/user";
import { signIn } from "../../store/actions/user";

const Form = () => {
  const { currentUser, setCurrentUser } = userProvider();

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "შეავსეთ ველი";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "ელ-ფოსტა არასწორია";
    }
    if (!values.password) {
      errors.password = "შეავსეთ ველი";
    } else if (values.password.length < 8) {
      errors.password = "პაროლი უნდა შედგებოდეს მინიმუმ 8 სიმბოლოსგან";
    }
    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    formik.setValues({ ...values, password: "" });
    setSubmitting(true);
    signIn(
      {
        email: values.email,
        password: values.password,
      },
      setCurrentUser,
      setSubmitting
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
    <View style={styles.container}>
      {formik.errors.email && (
        <Text style={styles.errMsg}>{formik.errors.email}</Text>
      )}
      <Input
        type="text"
        placeholder="ელ-ფოსტა"
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        error={formik.errors.email ? true : false}
      />
      {formik.errors.password && (
        <Text style={styles.errMsg}>{formik.errors.password}</Text>
      )}
      <Input
        type="password"
        placeholder="პაროლი"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        error={formik.errors.password ? true : false}
      />
      <Button
        title="შესვლა"
        onPress={formik.handleSubmit}
        disabled={formik.isSubmitting}
        st={{ marginTop: "auto" }}
      />
      <TouchableOpacity style={{ marginTop: 15 }}>
        <Text
          style={{
            color: "#46596C",
            fontSize: 16,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          პაროლის აღდგენა
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexGrow: 1,
    width: "100%",
  },
  errMsg: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
    marginLeft: 5,
  },
});
