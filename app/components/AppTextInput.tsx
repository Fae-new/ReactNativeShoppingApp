import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

type iconName = keyof typeof MaterialCommunityIcons.glyphMap;

const AppTextInput = ({
  icon,
  width = "100%",
  ...otherProps
}: { icon?: iconName; width?: string | number } & TextInputProps) => {
  return (
    <View style={[styles.container, { width }]}>
      {icon ? (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.grey}
          style={styles.icon}
        />
      ) : null}

      <TextInput style={[defaultStyles.text, { flex: 1 }]} {...otherProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.lightgrey,
    borderRadius: 25,
    flexDirection: "row",

    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
