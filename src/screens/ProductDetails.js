import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Styles";
import { BASE_URL } from "../redux/config";
import Rating from "../components/Card/Rating";
import { deleteProduct, listProducts } from "../redux/actions/productActions";
import { PRODUCT_DELETE_RESET } from "../redux/constants/productConstants";

const ProductDetails = ({ route, navigation }) => {
  const [selectedProduct, setSelectedProduct] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    let { product } = route.params;
    setSelectedProduct(product);
  }, []);

  const deleteHandler = (id) => {
    Alert.alert(
      "Warning",
      "Are you sure you want to delete",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(deleteProduct(id));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const productDelete = useSelector((state) => state.productDelete);
  const { success } = productDelete;

  if (success) {
    dispatch({ type: PRODUCT_DELETE_RESET });
    dispatch(listProducts());
    navigation.navigate("Products");
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.padding}>
          <Image
            source={{
              uri: `${BASE_URL}${selectedProduct.image}`,
            }}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
            }}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.textLargeBold}>
              {selectedProduct && selectedProduct.name}
            </Text>
            <View>
              <Text style={styles.textSmallBold}>Overall Rating</Text>
              <Rating value={selectedProduct && selectedProduct.rating} />
              <Text style={styles.textSmall}>
                {selectedProduct.numReviews} Number of Review(s)
              </Text>
            </View>
            <Text style={styles.textSmall}>
              {selectedProduct && selectedProduct.description}
            </Text>
            <View style={styles.row}>
              <Text style={styles.textSmallBold}>
                Brand: {selectedProduct && selectedProduct.brand}
              </Text>
              <Text style={styles.textSmallBold}>
                Available in Stock:{" "}
                {selectedProduct && selectedProduct.countInStock}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.textSmallBold}>
                Category: {selectedProduct && selectedProduct.category}
              </Text>
              <Text style={styles.textSmallBold}>
                Price: &#x20A6; {selectedProduct && selectedProduct.price}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textMediumBold}>Product Reviews</Text>
            </View>

            <View>
              <FlatList
                data={selectedProduct.reviews}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => `${item._id}`}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        width: "100%",
                        height: "auto",
                        padding: 15,
                        marginBottom: 10,
                        borderRadius: 5,
                        backgroundColor: "white",
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.26,
                        shadowRadius: 2.68,
                        elevation: 3,
                      }}
                    >
                      <Text>{item.name}</Text>

                      <Rating value={item.rating} />
                      <Text>{item.comment}</Text>
                    </View>
                  );
                }}
              />
              <TouchableOpacity
                style={[styles.button, styles.gold]}
                onPress={() =>
                  navigation.navigate("EditProduct", {
                    product: selectedProduct,
                  })
                }
              >
                <Text style={[styles.textLight, styles.center]}>
                  Edit Product
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.green]}
                onPress={() => deleteHandler(selectedProduct._id)}
              >
                <Text style={[styles.textLight, styles.center]}>
                  Delete Product
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;
