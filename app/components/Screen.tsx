import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";

const Screen = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style: {};
}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default Screen;
