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
import { deleteProduct, listProducts } from "../redux/actions/productActions";
import { PRODUCT_DELETE_RESET } from "../redux/constants/productConstants";
import OrderCard from "../components/Card/OrderCard";

const OrderDetails = ({ route, navigation }) => {
  const [selectedProduct, setSelectedProduct] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    let { product } = route.params;
    setSelectedProduct(product);
  }, []);

  const deleteHandler = (id) => {
    // Alert.alert(
    //   "Warning",
    //   "Are you sure you want to delete",
    //   [
    //     {
    //       text: "Cancel",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel",
    //     },
    //     {
    //       text: "OK",
    //       onPress: () => {
    //         dispatch(deleteProduct(id));
    //       },
    //     },
    //   ],
    //   { cancelable: false }
    // );
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
          <View style={styles.inputContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.textLargeBold}>
                {selectedProduct && selectedProduct.user.name}
              </Text>
              <Text style={styles.textSmall}>
                <Text style={styles.textSmallBold}>Address: </Text>{" "}
                {selectedProduct && selectedProduct.shippingAddress.address}
              </Text>

              <Text style={styles.textSmallBold}>
                City:{" "}
                <Text style={styles.textSmall}>
                  {selectedProduct && selectedProduct.shippingAddress.city}
                </Text>
              </Text>

              <Text style={styles.textSmall}>
                <Text style={styles.textSmallBold}>Country: </Text>{" "}
                {selectedProduct && selectedProduct.shippingAddress.country}
              </Text>
              <Text style={styles.textSmall}>
                <Text style={styles.textSmallBold}>Postal Code: </Text>
                {selectedProduct && selectedProduct.shippingAddress.postalCode}
              </Text>
            </View>

            <View>
              <View>
                <Text>Order Items</Text>
              </View>
              <FlatList
                data={selectedProduct.orderItems}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => `${item._id}`}
                renderItem={({ item, index }) => {
                  return (
                    <OrderCard
                      containerStyle={{
                        backgroundColor: item.color,
                      }}
                      info={item}
                    />
                  );
                }}
              />

              <View style={styles.inputContainer}>
                <Text style={styles.textMediumBold}>
                  Total Amount Paid:{" "}
                  <Text style={styles.textMedium}>
                    &#x20A6; {selectedProduct.totalPrice}
                  </Text>
                </Text>
                <Text style={styles.textSmallBold}>
                  Payment Date:{" "}
                  <Text style={styles.textSmall}>
                    {selectedProduct.updatedAt}
                  </Text>
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.button, styles.green]}
                onPress={() => deleteHandler(selectedProduct._id)}
              >
                <Text style={[styles.textLight, styles.center]}>
                  Mark as Delivered
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetails;
