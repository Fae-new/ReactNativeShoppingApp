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
import useAuthContext from "../hooks/useAuthContext";
import { useContext } from "react";
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
  const authContext = useContext(AuthContext);

  const handleLogout = async () => {
    await authStorage.removeUserObject();
    authContext?.setUser(() => undefined);
    signOut(auth);
  };
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <Listitem
          title={authContext?.user?.userName as string}
          subtitle={authContext?.user?.email as string}
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
              onPress={() =>
                navigation.navigate(
                  item.targetScreen as keyof accountStackParamList
                )
              }
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
        onPress={() => {
          if (authContext?.setUser) handleLogout();
        }}
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
