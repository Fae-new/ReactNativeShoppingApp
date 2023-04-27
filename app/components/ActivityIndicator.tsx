import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";

import LottieView from "lottie-react-native";

const ActivityIndicator = ({ visible = false }: { visible: boolean }) => {
  if (visible)
    return (
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop
          source={require("../assets/animations/loader.json")}
          style={styles.lottie}
        />
      </View>
    );
  else return null;
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "white",
    opacity: 0.8,
    zIndex: 1,
  },

  lottie: { width: 200, height: 200 },
});
export default ActivityIndicator;
