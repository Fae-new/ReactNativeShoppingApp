import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import AppText from "../components/AppText";
import Listitem from "../components/Listitem";
import colors from "../config/colors";
import { feedStackParamList } from "../navigation/FeedStackNavigator";
import CustomButton from "../components/CustomButton";
import AppTextInput from "../components/AppTextInput";

const ListingDetails = ({
  route,
}: StackScreenProps<feedStackParamList, "ListingDetails">) => {
  let numberOfListings = route.params.numberOfListings + " listings";
  if (route.params.numberOfListings === 1) {
    numberOfListings = "1 listing";
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        <Image
          style={styles.image}
          source={{ uri: route.params.imageDownloadUrl }}
        />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{route.params.title}</AppText>
          <AppText style={styles.price}>{"$" + route.params.price}</AppText>
          <AppText> {route.params.description} </AppText>
        </View>

        <Listitem
          title={route.params.user.userName as string}
          subtitle={numberOfListings}
          image={require("../assets/placeholder.jpg")}
        />

        <View style={{ padding: 20 }}>
          <AppTextInput placeholder="Message..." onChangeText={() => {}} />
          <CustomButton
            title="CONTACT SELLER"
            onPress={() => {
              Keyboard.dismiss();
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 220,
  },
  detailsContainer: { paddingTop: 10, paddingLeft: 5 },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  price: {
    fontWeight: "bold",
    color: colors.secondary,
    fontSize: 20,
    paddingTop: 10,
  },
});

export default ListingDetails;
