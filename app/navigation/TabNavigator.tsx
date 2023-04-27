import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native/Libraries/Utilities/Platform";

import ListingEditScreen from "../screens/AddListingScreen";
import FeedStackNavigator from "./FeedStackNavigator";
import colors from "../config/colors";
import Icon from "../components/Icon";
import AccountNavigator from "./AccountNavigator";
import NewListingButton from "./NewListingButton";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import useAuthContext from "../hooks/useAuthContext";

export type tabParamList = {
  FeedNavigator: undefined;
  AddListing: undefined;
  Account: undefined;
};

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  //   const authContext = useAuthContext()

  //   const registerForPushNotificationsAsync=async()=> {

  // try {

  //   let token;
  //   if (Device.isDevice) {
  //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     const documentRef = doc(db, "usernames", authContext?.user.uid as string);

  //    await updateDoc(documentRef, { expoPushNotificationToken: token });
  //   authContext?.setUser({...authContext.user,expoPushNotificationToken:token})
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }

  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }

  //   return token;
  // } catch (error) {
  //   console.log(error)
  // }

  //   }

  //   useEffect(() => {
  //  registerForPushNotificationsAsync()
  //   }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.danger,
        inactiveTintColor: colors.grey,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedStackNavigator}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              name="home"
              size={size}
              color={focused ? colors.danger : colors.grey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddListing"
        component={ListingEditScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ size, focused }) => (
            <Icon
              name="plus-outline"
              size={size * 2}
              iconColor={colors.white}
              backgroundColor={colors.danger}
            />
          ),
          tabBarButton: () => (
            <NewListingButton
              onPress={() => {
                navigation.navigate("AddListing");
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              name="account"
              size={size}
              color={focused ? colors.danger : colors.grey}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
