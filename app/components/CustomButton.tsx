import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../config/colors";

interface Btnprops {
  title: string;
  onPress: () => any;
  color?: string;
  opacity?: number;
}

const CustomButton = ({
  title,
  onPress,
  color = "primary",
  opacity,
}: Btnprops) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors[color as keyof typeof colors],
          opacity: opacity,
        },
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginBottom: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default CustomButton;
