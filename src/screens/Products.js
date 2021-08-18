import React, { useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/Card/ProductCard";
import { listProducts } from "../redux/actions/productActions";
import styles from "./Styles";
import { FloatingAction } from "react-native-floating-action";

const Products = (props) => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <FlatList
            data={products}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => `${item._id}`}
            renderItem={({ item, index }) => {
              return (
                <ProductCard
                  info={item}
                  onPress={() =>
                    props.navigation.navigate("Product Details", {
                      product: item,
                    })
                  }
                />
              );
            }}
          />

          <FloatingAction
            position="right"
            animated={false}
            showBackground={false}
            onPressMain={() => props.navigation.navigate("AddProduct")}
            color="black"
          />
        </>
      )}
    </View>
  );
};

export default Products;
