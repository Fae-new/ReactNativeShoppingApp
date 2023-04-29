import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, FlatList } from "react-native";

import { ListingsType } from "../api/listingsApi2";
import listingsApi from "../api/listingsApi2";
import Card from "../components/Card";
import Screen from "../components/Screen";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import AuthContext from "../api/auth/context";

const MyListings = ({}: {}) => {
  const [listings, setListings] = useState<ListingsType>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const authContext = useContext(AuthContext);
  const MyListings = listings?.filter(
    (listing) => listing.user.uid === authContext?.user?.uid
  );

  useEffect(() => {
    listingsApi.getListings(setLoading, setError, setListings);
  }, []);
  return (
    <>
      <ActivityIndicator visible={loading} />

      {MyListings?.length === 0 ? (
        <>
          <Text style={styles.text}> You have no listings yet</Text>
        </>
      ) : (
        <Screen style={styles.screen}>
          <FlatList
            data={MyListings}
            keyExtractor={(listing) => listing.docId}
            renderItem={({ item }) => (
              <Card title={item.title} imageUrl={item.imageDownloadUrl} />
            )}
            refreshing={refreshing}
            onRefresh={() => {
              listingsApi.getListings(setLoading, setError, setListings);
            }}
          />
        </Screen>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 10,
    backgroundColor: colors.lightgrey,
  },
  text: {
    textAlign: "center",
    fontSize: 22,
  },
});

export default MyListings;
