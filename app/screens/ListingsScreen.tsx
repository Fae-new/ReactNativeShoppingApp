import { FlatList, StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useEffect, useState, useContext } from "react";
import { feedStackParamList } from "../navigation/FeedStackNavigator";

import ActivityIndicator from "../components/ActivityIndicator";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listingsApi2";
import Screen from "../components/Screen";

type ListingScreenProps = StackScreenProps<feedStackParamList, "Listings">;

import { ListingsType } from "../api/listingsApi2";

const ListingsScreen = ({ navigation }: ListingScreenProps) => {
  const [listings, setListings] = useState<ListingsType>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);

  setTimeout(() => {
    if (listings?.length === 0) {
      setError(true);
    }
  }, 1100);

  useEffect(() => {
    listingsApi.getListings(setLoading, setError, setListings);
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        <FlatList
          data={listings}
          keyExtractor={(listing) => listing.docId}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              imageUrl={item.imageDownloadUrl}
              subTitle={"$" + item.price}
              onPress={() => navigation.navigate("ListingDetails", item)}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            listingsApi.getListings(setLoading, setError, setListings);
          }}
        />
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 10,
    backgroundColor: colors.lightgrey,
  },
});

export default ListingsScreen;
