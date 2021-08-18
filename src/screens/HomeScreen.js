import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import styles from "./Styles";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
