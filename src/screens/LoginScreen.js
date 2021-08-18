import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./Styles";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const loginhandler = () => {
    dispatch(login(email, password));
  };
  useEffect(() => {
    const login = async () => {
      const user = await AsyncStorage.getItem("userInfo");
      const userToken = JSON.parse(user);
      if (userToken.token !== null || undefined) {
        props.navigation.navigate("Dashboard");
      }
    };
    login();
  }, [userInfo, props]);
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.loginImage}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <>
            <View style={styles.form}>
              <Text style={[{ fontSize: 20 }, styles.center]}>
                Admin Portal
              </Text>
              {error && <Text style={styles.error}>{error}</Text>}
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Email Address"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Password"
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  style={styles.input}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.inputContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.green]}
                  onPress={loginhandler}
                >
                  <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
