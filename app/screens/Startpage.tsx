import { View, StyleSheet, ImageBackground, Text, Image } from "react-native";

import CustomButton from "../components/CustomButton";

import type { authStackParamList } from "../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";

const Startpage = ({
  navigation,
}: StackScreenProps<authStackParamList, "Welcome">) => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
      blurRadius={4}
    >
      <View style={styles.logocontainer}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        <Text style={styles.tagline}>Sell What you don't need</Text>
      </View>

      <View style={styles.btnContainer}>
        <CustomButton
          title="Login"
          color="secondary"
          onPress={() => {
            navigation.navigate("Login");
          }}
        />

        <CustomButton
          title="Register"
          color="primary"
          onPress={() => {
            navigation.navigate("Register");
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  buttons: {},
  logo: {
    width: 100,
    height: 100,
  },
  logocontainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  btnContainer: {
    width: "100%",
    padding: 20,
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 10,
  },
});

export default Startpage;
