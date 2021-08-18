import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

import LoginScreen from "../../screens/LoginScreen";
import HomeScreen from "../../screens/HomeScreen";
import Dashboard from "../../screens/Dashboard";
import TabIcon from "./TabIcon";
import Products from "../../screens/Products";
import ProductDetails from "../../screens/ProductDetails";
import AddProduct from "../../screens/AddProduct";
import Category from "../../screens/Category";
import AddCategory from "../../screens/AddCategory";
import EditProduct from "../../screens/EditProduct";
import Orders from "../../screens/Orders";
import OrderDetails from "../../screens/OrderDetails";

function TabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{
        showLabel: true,
        style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "white",
          borderTopColor: "transparent",
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarIcon: () => <TabIcon icon="home" />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Category"
        component={Category}
        options={{
          tabBarIcon: () => <TabIcon icon="appstore1" />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Products"
        component={Products}
        options={{
          tabBarIcon: () => <TabIcon icon="appstore1" />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: () => <TabIcon icon="shoppingcart" />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Account"
        component={Dashboard}
        options={{
          tabBarIcon: () => <TabIcon icon="user" />,
        }}
      />

      {/* <Tabs.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="user" />
          ),
          headerShown: true,
        }}
      /> */}
    </Tabs.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Dashboard"
          component={TabsNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Order Details"
          component={OrderDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddCategory"
          component={AddCategory}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerShown: true }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
