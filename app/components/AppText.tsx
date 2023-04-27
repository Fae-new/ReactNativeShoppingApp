import { Text, TextProps } from "react-native";

import defaultStyles from "../config/styles";
const AppText = ({
  children,
  style,
  ...otherProps
}: {
  children: React.ReactNode;
  style?: {};
} & TextProps) => {
  return (
    <Text {...otherProps} style={[defaultStyles.text, style]}>
      {children}
    </Text>
  );
};

export default AppText;
