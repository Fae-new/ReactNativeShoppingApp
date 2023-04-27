import { TouchableOpacity, StyleSheet } from "react-native";

import type { categoriesType } from "./AppPicker";
import React from "react";
import AppText from "./AppText";

const PickerItem = ({
  item,
  onPress,
}: {
  item: categoriesType[number];
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style={styles.text}>{item.label}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});
export default PickerItem;
