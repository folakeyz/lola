import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import styles from "./Styles";
import { useSelector, useDispatch } from "react-redux";
import { createCategory, listCategory } from "../redux/actions/categoryActions";
import { CATEGORY_CREATE_RESET } from "../redux/constants/categoryConstants";

const AddCategory = (props) => {
  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading, error, success } = categoryCreate;

  const [name, setName] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {}, []);

  const submitHandler = () => {
    if (!name) {
      alert("Add Category Name");
    } else {
      dispatch(createCategory(name));
    }
  };

  if (success) {
    dispatch(listCategory());
    dispatch({ type: CATEGORY_CREATE_RESET });
    alert("Category Added Successfully");
    props.navigation.navigate("Category");
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
              <Text style={styles.textMediumBold}>Add Category</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Category Name"
                  onChangeText={(text) => setName(text)}
                  value={name}
                  style={styles.input}
                />
              </View>

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
                    Add Category
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default AddCategory;
