import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import type { PickerItemType } from "./AppPicker";
import AppText from "./AppText";
import Icon from "./Icon";

const CategoryPickerItem: PickerItemType = ({ item, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Icon
          name={item.iconName}
          backgroundColor={item.backgroundColor}
          size={80}
          iconColor="white"
        />
        <AppText style={styles.label}> {item.label}</AppText>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  label: {
    marginTop: 5,
  },
});
export default CategoryPickerItem;
