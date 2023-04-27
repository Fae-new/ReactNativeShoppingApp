import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useFormikContext } from "formik";

import Error from "../Error";
import ImageInput from "../ImageInput";

const FormImageInput = ({ name }: { name: string }) => {
  const { touched, errors } = useFormikContext();

  return (
    <>
      <ImageInput name="images" />
      <Error
        error={errors[name as keyof typeof errors]}
        visible={touched[name as keyof typeof touched]}
      />
    </>
  );
};

export default FormImageInput;
