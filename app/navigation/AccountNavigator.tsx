import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MyListings from "./MyListings";

export type accountStackParamList = {
  Account: undefined;
  Messages: undefined;
  Mylistings: undefined;
};

const Stack = createStackNavigator<accountStackParamList>();

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen
        name="Mylistings"
        options={{ title: "My Listings" }}
        component={MyListings}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AccountNavigator;
