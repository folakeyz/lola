import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Styles";
import { getUserOrders } from "../redux/actions/orderActions";
import CategoryCard from "../components/Card/CategoryCard";

const Orders = (props) => {
  const order = useSelector((state) => state.order);
  const { loading, orders, error } = order;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <View style={styles.padding}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <>
            {error && <Text style={styles.error}>{error}</Text>}
            <FlatList
              data={orders}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => `${item._id}`}
              renderItem={({ item, index }) => {
                return (
                  <CategoryCard
                    containerStyle={{
                      backgroundColor: item.color,
                    }}
                    info={item}
                    onPress={() =>
                      props.navigation.navigate("Order Details", {
                        product: item,
                      })
                    }
                  />
                );
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default Orders;
