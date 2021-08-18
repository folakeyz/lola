import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Button,
  Image,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./Styles";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { listProducts, updateProduct } from "../redux/actions/productActions";
import { BASE_URL } from "../redux/config";
import axios from "axios";
import { PRODUCT_UPDATE_RESET } from "../redux/constants/productConstants";
import RNPickerSelect from "react-native-picker-select";
import { listCategory } from "../redux/actions/categoryActions";

const EditProduct = ({ route, navigation }) => {
  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading, error, success } = productUpdate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState([]);
  const [errors, setErrors] = useState();
  const [photonames, setPhotoNames] = useState([]);

  const removePhoto = (index) => {
    const img = [...image];
    const r = img.splice(index, 1);
    setImage(img);
    setPhotoNames(img);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    dispatch(listCategory());
    let { product } = route.params;
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
    setImage(product.image);
    setPhotoNames(product.image);
  }, [dispatch]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setUploading(true);

      let localUri = result.uri;
      let filename = localUri.split("/").pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      formData.append("image", { uri: localUri, name: filename, type });

      try {
        const config = {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const { data } = await axios.post(
          `${BASE_URL}/api/upload`,
          formData,
          config
        );

        setPhotoNames([...photonames, filename]);
        setImage([...image, data]);
        setUploading(false);
      } catch (error) {
        setUploading(false);
        setErrors(error);
      }
    }
  };

  const submitHandler = () => {
    if (image.length === 0) {
      alert("Upload at least one image");
    } else {
      dispatch(
        updateProduct(
          name,
          price,
          brand,
          category,
          countInStock,
          description,
          image,
          id
        )
      );
    }
  };

  if (success) {
    dispatch(listProducts());
    dispatch({ type: PRODUCT_UPDATE_RESET });
    alert("Product Updated Successfully");
    navigation.navigate("Products");
  }
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <ScrollView>
            {error && <Text>{error}</Text>}
            <View style={styles.padding}>
              <Text style={styles.textMediumBold}>Add Product</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Product Name"
                  onChangeText={(text) => setName(text)}
                  value={name}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Price"
                  onChangeText={(text) => setPrice(text)}
                  value={price.toString()}
                  style={styles.input}
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Brand"
                  onChangeText={(text) => setBrand(text)}
                  value={brand}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <RNPickerSelect
                  onValueChange={(text) => setCategory(text)}
                  useNativeAndroidPickerStyle={false}
                  style={{
                    inputAndroid: {
                      borderColor: "black",
                      borderWidth: 0,
                      borderBottomColor: "black",
                      borderBottomWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 5,
                      borderRadius: 0,
                      color: "black",
                    },
                  }}
                  items={categories.map((item) => ({
                    label: item.name,
                    value: item._id,
                  }))}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Available in Stock"
                  onChangeText={(text) => setCountInStock(text)}
                  value={countInStock.toString()}
                  style={styles.input}
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Description"
                  onChangeText={(text) => setDescription(text)}
                  value={description}
                  style={styles.input}
                  multiline
                  numberOfLines={6}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textSmall}>
                  Note: You can upload as many as possible
                </Text>
                {errors && <Text style={styles.error}>{errors.message}</Text>}
                {photonames &&
                  photonames.map((item, index) => (
                    <View key={index} style={styles.row}>
                      <Image
                        source={{ uri: BASE_URL + item }}
                        style={{ width: 200, height: 100 }}
                      />

                      <TouchableOpacity
                        style={[styles.button, styles.danger]}
                        onPress={() => removePhoto(index)}
                      >
                        <Text style={[styles.textLight, styles.center]}>
                          Remove
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                <Button
                  title="Upload Image"
                  onPress={pickImage}
                  style={[styles.button, styles.color]}
                />
              </View>
              {uploading ? (
                <Text style={[styles.button, styles.color]}>
                  Uploading Image
                </Text>
              ) : (
                <View style={styles.inputContainer}>
                  <TouchableOpacity
                    onPress={submitHandler}
                    style={[styles.button, styles.green]}
                  >
                    <Text
                      style={[
                        styles.textLight,
                        styles.textMedium,
                        { textAlign: "center" },
                      ]}
                    >
                      Edit Product
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default EditProduct;
