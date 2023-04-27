import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Error from "../Error";
import { TextInputProps } from "react-native/Libraries/Components/TextInput/TextInput";
import colors from "../../config/colors";

type iconName = keyof typeof MaterialCommunityIcons.glyphMap;

const AppFormField = ({
  name,
  icon,
  width = "100%",
  ...otherProps
}: {
  name: string;
  icon?: iconName;
  width?: number | string;
} & TextInputProps) => {
  const {
    setFieldTouched,

    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <>
      <AppTextInput
        icon={icon}
        {...otherProps}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name as keyof typeof values]}
        onBlur={() => setFieldTouched(name)}
        placeholderTextColor={colors.grey}
        width={width}
      />

      <Error
        error={errors[name as keyof typeof errors]}
        visible={touched[name as keyof typeof touched]}
      />
    </>
  );
};

export default AppFormField;
