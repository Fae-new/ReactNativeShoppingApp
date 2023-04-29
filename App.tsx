import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import TabNavigator from "./app/navigation/TabNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import NoInternet from "./app/components/NoInternet";
import AuthContext, { UserObject } from "./app/api/auth/context";
import authStorage from "./app/api/auth/authStorage";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState<UserObject | undefined>();
  const [isReady, setIsReady] = useState(false);

  const restoreToken = async () => {
    const userObject = await authStorage.getUserObject();
    if (!userObject) return setIsReady(true);
    setUser(userObject);
    setIsReady(true);
  };
  useEffect(() => {
    restoreToken();
  }, []);

  if (isReady) {
    // SplashScreen.hideAsync();
  }
  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        <NoInternet />
        {user === undefined ? <AuthNavigator /> : <TabNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
