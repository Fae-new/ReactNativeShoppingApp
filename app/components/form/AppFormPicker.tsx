import React from "react";
import AppPicker from "../AppPicker";
import { useFormikContext } from "formik";
import type { categoriesType } from "../AppPicker";
import Error from "../Error";
import type { PickerItemType } from "../AppPicker";

const AppFormPicker = ({
  items,
  name,
  placeholder,
  width,
  PickerItemComponent,
  numberOfColumns,
}: {
  name: string;
  placeholder: string;
  items: categoriesType;
  width: string | number;
  PickerItemComponent: PickerItemType;
  numberOfColumns: number;
}) => {
  const { setFieldValue, touched, errors, values } = useFormikContext();

  return (
    <>
      <AppPicker
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={values[name as keyof typeof values]}
        width={width}
        PickerItemComponent={PickerItemComponent}
      />

      <Error
        error={errors[name as keyof typeof errors]}
        visible={touched[name as keyof typeof touched]}
      />
    </>
  );
};

export default AppFormPicker;
