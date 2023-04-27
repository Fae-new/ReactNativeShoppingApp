import React from "react";
import { StyleSheet, View, Text } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";
import { useNetInfo } from "@react-native-community/netinfo";

const NoInternet = ({}: {}) => {
  const { isInternetReachable, type } = useNetInfo();

  if (type !== "unknown" && isInternetReachable === false)
    return (
      <View style={styles.container}>
        <AppText style={{ color: colors.white }}>
          No Internet Connection
        </AppText>
      </View>
    );
  return null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
    justifyContent: "center",
    height: 50,
  },
});

export default NoInternet;
