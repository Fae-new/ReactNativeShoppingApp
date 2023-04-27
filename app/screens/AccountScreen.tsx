import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";

import Icon from "../components/Icon";
import Listitem from "../components/Listitem";
import Screen from "../components/Screen";
import colors from "../config/colors";
import ListItemSeparator from "../components/ListItemSeparator";
import { accountStackParamList } from "../navigation/AccountNavigator";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import authStorage from "../api/auth/authStorage";
import AuthContext from "../api/auth/context";

const menuItems = [
  {
    title: "My Listings",
    icon: { name: "format-list-bulleted", backgroundColor: colors.primary },
    targetScreen: "Mylistings",
  },
  {
    title: "My Messages",
    icon: { name: "email", backgroundColor: colors.secondary },
    targetScreen: "Messages",
  },
];

const AccountScreen = ({
  navigation,
}: StackScreenProps<accountStackParamList, "Account">) => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    if (setUser) setUser(undefined);
    signOut(auth);
    authStorage.removeUserObject();
  };
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <Listitem
          title={user?.userName as string}
          subtitle={user?.email as string}
          image={require("../assets/placeholder.jpg")}
        />
      </View>

      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <Listitem
              title={item.title}
              IconComponent={
                <Icon
                  name={
                    item.icon
                      .name as keyof typeof MaterialCommunityIcons.glyphMap
                  }
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
          ItemSeparatorComponent={() => <ListItemSeparator />}
        />
      </View>

      <Listitem
        title="Log out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={handleLogout}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  screen: {
    backgroundColor: colors.lightgrey,
  },
});
export default AccountScreen;
