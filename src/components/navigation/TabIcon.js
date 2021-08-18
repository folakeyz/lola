import React from "react";
import { View, Text, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const TabIcon = ({ focused, icon }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 80,
        width: 50,
      }}
    >
      <AntDesign
        name={icon}
        size={24}
        style={{
          color: focused ? "#0075FF" : "#E6E7E8",
        }}
      />
    </View>
  );
};

export default TabIcon;
