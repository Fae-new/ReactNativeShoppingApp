import React from "react";
import { StyleSheet } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";

const Error = ({
  error,
  visible,
}: {
  error: string | undefined;
  visible: boolean | undefined;
}) => {
  if (!error || !visible) return null;

  return <AppText style={styles.errorText}>{error}</AppText>;
};

const styles = StyleSheet.create({
  errorText: { paddingVertical: 20, color: colors.primary },
});
export default Error;
