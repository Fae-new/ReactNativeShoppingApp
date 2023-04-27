import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

import Icon from "./Icon";
import colors from "../config/colors";

const SelectImage = ({ selectImage }: { selectImage: () => void }) => {
  const requstPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      alert("you need to enable permissions");
    }
  };

  useEffect(() => {
    requstPermission();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage} style={styles.container}>
        <Icon
          size={80}
          iconColor={colors.grey}
          name="camera"
          backgroundColor={colors.lightgrey}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: colors.lightgrey,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});

export default SelectImage;
