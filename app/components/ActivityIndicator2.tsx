import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";

const ActivityIndicator2 = ({ height }: { height: number }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/animations/data.json")}
        autoPlay
        style={{ height, width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ActivityIndicator2;
