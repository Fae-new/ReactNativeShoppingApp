import { View, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import colors from "../config/colors";

const Productview = () => {
  return (
    <View style={styles.container}>
      <View style={styles.closeIcon}>
        <FontAwesome name="close" size={30} color="white" />
      </View>

      <View style={styles.deleteIcon}>
        <FontAwesome name="trash" size={30} color="white" />
      </View>

      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("../assets/chair.jpg")}
      ></Image>
    </View>
  );
};

export default Productview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  closeIcon: {
    position: "absolute",
    top: 40,
    left: 30,
  },
  deleteIcon: {
    position: "absolute",
    top: 40,
    right: 30,
  },

  image: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 60,
  },
});
