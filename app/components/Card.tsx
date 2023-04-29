import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

interface CardProps {
  title: string;
  imageUrl: string;
  subTitle?: string;
  onPress?: () => void;
}

const Card = ({ title, imageUrl, subTitle, onPress }: CardProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.cardImg} source={{ uri: imageUrl }} />

        <View style={styles.detailContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subtitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 5,
  },
  cardImg: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  detailContainer: {
    padding: 20,
  },
  title: { marginBottom: 7 },
  subtitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});
export default Card;
