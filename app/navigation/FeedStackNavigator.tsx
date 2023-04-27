import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import { ListingsType } from "../api/listingsApi2";
import ListingDetails from "../screens/Listingdetails";

export type feedStackParamList = {
  Listings: undefined;
  ListingDetails: ListingsType[number];
};

const Stack = createStackNavigator<feedStackParamList>();

const FeedStackNavigator = () => {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        gestureEnabled: true,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <Stack.Screen
        name="Listings"
        component={ListingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListingDetails"
        component={ListingDetails}
        options={{ headerTitle: "Listing details" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default FeedStackNavigator;
