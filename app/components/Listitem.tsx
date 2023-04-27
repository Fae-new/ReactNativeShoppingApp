import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";

interface CardProps {
  title: string;
  image: number;
  IconComponent?: React.ReactNode;
  subtitle?: string;
  onPress?: () => void;
  renderRightActions?: () => React.ReactNode;
}

const Listitem = ({
  image,
  title,
  subtitle,
  onPress,
  renderRightActions,
  IconComponent,
}: CardProps) => {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight onPress={onPress} underlayColor={colors.lightgrey}>
          <View style={styles.container}>
            {IconComponent}
            {image ? <Image source={image} style={styles.image} /> : null}
            <View style={styles.detailsContainer}>
              <AppText style={styles.title} numberOfLines={1}>
                {title}
              </AppText>
              {subtitle ? (
                <AppText style={styles.subtitle} numberOfLines={2}>
                  {subtitle}
                </AppText>
              ) : null}
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={25}
              color={colors.grey}
            />
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: colors.white,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  detailsContainer: { marginLeft: 10, justifyContent: "center", flex: 1 },
  title: {
    fontWeight: "500",
  },
  subtitle: {
    color: colors.grey,
  },
});

export default Listitem;
