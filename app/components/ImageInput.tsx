import { useRef } from "react";
import * as ImagePicker from "expo-image-picker";
import { useFormikContext } from "formik";

import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  View,
  ScrollView,
} from "react-native";

import SelectImage from "./SelectImage";
import { FormValuesType } from "../screens/AddListingScreen";

const ImageInput = ({ name }: { name: string }) => {
  // const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

  const scrollView = useRef<ScrollView>(null);
  const { setFieldValue, values } = useFormikContext<FormValuesType>();
  const imageAssets = values[
    name as keyof FormValuesType
  ] as ImagePicker.ImagePickerAsset[];

  const addImage = async () => {
    try {
      const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      console.log(assets);

      if (!canceled) {
        if (imageAssets.length == 0) {
          setFieldValue(name, [...assets]);
        } else {
          setFieldValue(name, [...imageAssets, assets]);
        }
      }
    } catch (error) {
      console.log("Error reading image ", error);
    }
  };

  const handleDelete = (image: ImagePicker.ImagePickerAsset) => {
    Alert.alert("Delete image", "Are you sure you want to delete this image", [
      {
        text: "Yes",
        onPress: () =>
          setFieldValue(
            name,
            imageAssets.filter((item) => item.uri != image.uri)
          ),
      },
      { text: "No" },
    ]);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          ref={scrollView}
          horizontal
          onContentSizeChange={() =>
            scrollView.current?.scrollToEnd({ animated: true })
          }
          persistentScrollbar={false}
        >
          {imageAssets.map((image) => (
            <TouchableOpacity
              key={image.uri}
              onPress={() => handleDelete(image)}
            >
              <Image source={{ uri: image.uri }} style={styles.image} />
            </TouchableOpacity>
          ))}

          <SelectImage selectImage={addImage} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
});

export default ImageInput;
