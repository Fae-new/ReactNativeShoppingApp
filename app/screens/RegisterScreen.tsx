import React, { useState, useContext } from "react";
import { Keyboard, StyleSheet } from "react-native";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";

import Screen from "../components/Screen";
import AppFormField from "../components/form/AppFormField";
import SubmitButton from "../components/form/SubmitButton";
import Error from "../components/Error";
import authLayer from "../api/auth/authLayer";
import ActivityIndicator from "../components/ActivityIndicator";
import AuthContext from "../api/auth/context";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export type RegisterInfoType = {
  name: string;
  email: string;
  password: string;
};

const RegisterScreen = () => {
  const [error, setError] = useState({ errorText: "", visible: false });
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (
    authInfo: RegisterInfoType,
    actions: FormikHelpers<RegisterInfoType>
  ) => {
    await authLayer.authenticate(
      "register",
      {
        email: authInfo.email,
        password: authInfo.password,
        name: authInfo.name,
      },
      setError,
      setLoading,
      setUser
    );
    actions.resetForm();
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
          validationSchema={validationSchema}
        >
          {() => (
            <>
              <AppFormField
                autoCorrect={false}
                icon="account"
                name="name"
                placeholder="Name"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="email"
                placeholder="Email"
                textContentType="emailAddress"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                name="password"
                placeholder="Password"
                secureTextEntry
                textContentType="password"
              />
              <Error error={error.errorText} visible={error.visible} />
              <SubmitButton title="Register" />
            </>
          )}
        </Formik>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default RegisterScreen;
