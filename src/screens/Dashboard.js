import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import styles from "./Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { getInventory } from "../redux/actions/inventoryActions";
import TrendingCard from "../components/Card/TrendingCard";
import { getUserOrders } from "../redux/actions/orderActions";
import CategoryCard from "../components/Card/CategoryCard";

const Dashboard = () => {
  const [users, setUsers] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const login = async () => {
      const user = await AsyncStorage.getItem("userInfo");
      const parse = JSON.parse(user);
      setUsers(parse);
    };
    login();
    dispatch(getInventory());
    dispatch(getUserOrders());
  }, [dispatch]);

  const log = useSelector((state) => state.log);
  const { inventory } = log;
  const order = useSelector((state) => state.order);
  const { orders, error } = order;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.padding}>
        <Text style={styles.textMedium}>Dashboard</Text>
        <View>
          <Text style={[styles.textDark, styles.textMediumBold]}>
            Hello {users.name}
          </Text>
        </View>
        <View>
          <FlatList
            data={inventory}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item.name}`}
            renderItem={({ item, index }) => {
              return (
                <TrendingCard
                  containerStyle={{
                    backgroundColor: item.color,
                  }}
                  info={item}
                />
              );
            }}
          />
        </View>
        <View style={styles.order}>
          <Text style={styles.textMedium}>Recent Orders</Text>
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
                />
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
