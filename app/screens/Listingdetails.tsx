import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Text,
  Alert,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import AppText from "../components/AppText";
import Listitem from "../components/Listitem";
import colors from "../config/colors";
import { feedStackParamList } from "../navigation/FeedStackNavigator";
import CustomButton from "../components/CustomButton";
import AppTextInput from "../components/AppTextInput";
import { db } from "../config/firebase";
import ActivityIndicator2 from "../components/ActivityIndicator2";

type sellerInfo = {
  numberOfListings: number;
  uid: string;
  username: string;
};

const ListingDetails = ({
  route,
}: StackScreenProps<feedStackParamList, "ListingDetails">) => {
  const [sellerInfo, setSellerInfo] = useState<sellerInfo>();
  const [message, setMessage] = useState("");

  const getSeller = async () => {
    const docRef = doc(db, "usernames", route.params.user.uid);
    const docSnap = await getDoc(docRef);
    setSellerInfo(docSnap.data() as sellerInfo);
  };

  useEffect(() => {
    getSeller();
  }, []);

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

        {sellerInfo ? (
          <>
            <Text style={{ fontSize: 20, paddingTop: 30 }}> Vendor Info</Text>
            <Listitem
              title={sellerInfo?.username as string}
              subtitle={
                sellerInfo?.numberOfListings.toString() +
                (sellerInfo?.numberOfListings === 1 ? " listing" : " listings")
              }
              image={require("../assets/placeholder.jpg")}
            />
          </>
        ) : (
          <>
            <ActivityIndicator2 height={100} />
            <Text style={{ textAlign: "center", color: colors.primary }}>
              Loading Vendor info...
            </Text>
          </>
        )}
        <View style={{ padding: 20 }}>
          <AppTextInput
            placeholder="Message..."
            onChangeText={(text) => {
              setMessage(text);
            }}
          />
          <CustomButton
            title="CONTACT SELLER"
            onPress={() => {
              Keyboard.dismiss();
              Alert.alert(
                "Message sent",
                `Message delivered to ${sellerInfo?.username} to buy ${route.params.title} `
              );
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
