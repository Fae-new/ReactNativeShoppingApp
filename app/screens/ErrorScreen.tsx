import React from "react";
import { StyleSheet, View, Text } from "react-native";

import AppText from "../components/AppText";
import CustomButton from "../components/CustomButton";
import listingsApi from "../api/listingsApi";
import { ListingsType } from "../api/listingsApi2";
import Icon from "../components/Icon";
import colors from "../config/colors";

type ErrorScreenProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<ListingsType | undefined>>;
  message: string;
};

const ErrorScreen = ({
  setLoading,
  setError,
  setData,
  message,
}: ErrorScreenProps) => {
  return (
    <View style={styles.container}>
      <AppText style={{ fontSize: 20 }}> {message}</AppText>
      <Icon
        name="access-point-network-off"
        iconColor={colors.primary}
        backgroundColor={colors.lightgrey}
        size={100}
      />
      <CustomButton
        title="Retry"
        color="primary"
        onPress={() => listingsApi.getListings(setLoading, setError, setData)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: "100%", justifyContent: "center", alignItems: "center" },
});

export default ErrorScreen;
