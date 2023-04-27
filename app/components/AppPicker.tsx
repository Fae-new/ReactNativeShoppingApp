import React, { SetStateAction, Dispatch } from "react";

import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import AppText from "./AppText";
import { useState } from "react";
import Screen from "./Screen";
import PickerItem from "./PickerItem";
import colors from "../config/colors";

type iconName = keyof typeof MaterialCommunityIcons.glyphMap;
export type categoriesType = {
  label: string;
  value: number;
  backgroundColor: string;
  iconName: iconName;
}[];

export type PickerItemType = ({
  item,
  onPress,
}: {
  item: categoriesType[number];
  onPress: () => void;
}) => JSX.Element;

const AppPicker = ({
  icon,
  placeholder,
  items,
  onSelectItem,
  selectedItem,
  width = "100%",
  PickerItemComponent = PickerItem,
  numberOfColumns = 1,
}: {
  icon: iconName;
  placeholder: string;
  items: categoriesType;
  selectedItem: categoriesType[number] | undefined;
  PickerItemComponent: PickerItemType;
  onSelectItem: Dispatch<SetStateAction<categoriesType[number]>>;
  width: string | number;
  numberOfColumns: number;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon ? (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.grey}
              style={styles.icon}
            />
          ) : null}

          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.grey}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen style={{}}>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            numColumns={numberOfColumns}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          ></FlatList>
        </Screen>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.lightgrey,
    borderRadius: 25,
    flexDirection: "row",

    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
  placeholder: { color: colors.grey, flex: 1 },
});

export default AppPicker;
