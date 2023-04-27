import * as Yup from "yup";
import { useState } from "react";
import { Formik, FormikHelpers } from "formik";

import { categoriesType } from "../components/AppPicker";
import CategoryPickerItem from "../components/CategoryPickerItem";
import AppForm from "../components/form/AppForm";
import AppFormField from "../components/form/AppFormField";
import AppFormPicker from "../components/form/AppFormPicker";
import SubmitButton from "../components/form/SubmitButton";
import Screen from "../components/Screen";
import FormImageInput from "../components/form/FormImageInput";
import useLocation from "../hooks/useLocation";
import listingsApi from "../api/listingsApi2";

import type { ImagePickerAsset } from "expo-image-picker";
import UploadScreen from "./UploadScreen";
import { useNetInfo } from "@react-native-community/netinfo";
import useAuthContext from "../hooks/useAuthContext";
import { ScrollView } from "react-native-gesture-handler";

export type FormValuesType = {
  title: string;
  price: string;
  description: string;
  category: string | null;
  images: ImagePickerAsset[];
};

const categories: categoriesType = [
  {
    backgroundColor: "#fc5c65",
    iconName: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    iconName: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    iconName: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    iconName: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    iconName: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    iconName: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    iconName: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    iconName: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    iconName: "application",
    label: "Other",
    value: 9,
  },
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image"),
});

const ListingEditScreen = () => {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { isInternetReachable } = useNetInfo();
  const authContext = useAuthContext();

  const location = useLocation();

  const handleSubmit = async (
    values: FormValuesType,
    actions: FormikHelpers<FormValuesType>
  ) => {
    if (!isInternetReachable) {
      return;
    }

    setUploadVisible(true);

    await listingsApi.addListing(values, setProgress, authContext);

    actions.resetForm();
  };

  return (
    <Screen style={{}}>
      <ScrollView>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <AppForm
          initialValues={{
            title: "",
            price: "",
            description: "",
            category: null,
            images: [],
          }}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
          validationSchema={validationSchema}
        >
          <FormImageInput name="images" />
          <AppFormField maxLength={255} name="title" placeholder="Title" />
          <AppFormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
            width={120}
          />
          <AppFormPicker
            items={categories}
            name="category"
            placeholder="Category"
            numberOfColumns={3}
            width="50%"
            PickerItemComponent={CategoryPickerItem}
          />
          <AppFormField
            maxLength={255}
            name="description"
            placeholder="Description"
            multiline
            numberOfLines={3}
          />

          <SubmitButton title="Post" />
        </AppForm>
      </ScrollView>
    </Screen>
  );
};

export default ListingEditScreen;
