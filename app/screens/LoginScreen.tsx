import { Image, StyleSheet } from "react-native";
import { useState, useContext } from "react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import Screen from "../components/Screen";
import AuthContext from "../api/auth/context";
import Error from "../components/Error";
import AppFormField from "../components/form/AppFormField";
import SubmitButton from "../components/form/SubmitButton";
import authLayer from "../api/auth/authLayer";
import ActivityIndicator from "../components/ActivityIndicator";
import type { AuthInfoType } from "../api/auth/authLayer";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const LoginScreen = () => {
  const [error, setError] = useState({ errorText: "", visible: false });
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (
    authInfo: AuthInfoType,
    actions: FormikHelpers<AuthInfoType>
  ) => {
    await authLayer.authenticate(
      "login",
      authInfo,
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
        <>
          <Image
            style={styles.logo}
            source={require("../assets/logo-red.png")}
          />
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, actions) => handleSubmit(values, actions)}
            validationSchema={validationSchema}
          >
            {() => (
              <>
                <AppFormField
                  name="email"
                  icon="email"
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  autoCorrect={false}
                />

                <AppFormField
                  icon="lock"
                  name="password"
                  placeholder="Password"
                  autoCapitalize="none"
                  textContentType="password"
                  secureTextEntry
                  autoCorrect={false}
                />
                <Error visible={error.visible} error={error.errorText} />
                <SubmitButton title="Login" />
              </>
            )}
          </Formik>
        </>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
