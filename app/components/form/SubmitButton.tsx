import React from "react";
import { useFormikContext } from "formik";

import CustomButton from "../CustomButton";
import { useNetInfo } from "@react-native-community/netinfo";
import colors from "../../config/colors";

const SubmitButton = ({ title = "Submit" }: { title: string }) => {
  const { handleSubmit } = useFormikContext();
  const { isInternetReachable } = useNetInfo();
  colors.lightgrey;
  return (
    <CustomButton
      title={title}
      onPress={handleSubmit}
      color={"primary"}
      opacity={isInternetReachable ? 1 : 0.5}
    />
  );
};

export default SubmitButton;
