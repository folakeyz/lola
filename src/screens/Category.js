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
import { FloatingAction } from "react-native-floating-action";
import { deleteCategory, listCategory } from "../redux/actions/categoryActions";

const Category = (props) => {
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

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
            dispatch(deleteCategory(id)), dispatch(listCategory());
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.padding}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <>
            {error && <Text style={styles.error}>{error}</Text>}
            <FlatList
              data={categories}
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
                    <View style={styles.row}>
                      <Text>{item.name}</Text>
                      <TouchableOpacity
                        style={[styles.danger]}
                        onPress={() => deleteHandler(item._id)}
                      >
                        <Text style={styles.text}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </>
        )}
      </View>
      <FloatingAction
        position="right"
        animated={false}
        showBackground={false}
        onPressMain={() => props.navigation.navigate("AddCategory")}
        color="black"
      />
    </View>
  );
};

export default Category;
