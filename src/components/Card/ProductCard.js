import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { BASE_URL } from "../../redux/config";
import styles from "../../screens/Styles";

const ProductCard = ({ containerStyle, info, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {/* Image */}
      <Image
        source={{
          uri: `${BASE_URL}${info.image}`,
        }}
        resizeMode="cover"
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
        }}
      />
      {/* Details */}
      <View
        style={{
          width: "65%",
          paddingHorizontal: 20,
        }}
      >
        <Text style={[styles.textMediumBold, { color: "darkblue" }]}>
          {info && info.name.length > 30
            ? info.name.slice(0, 30) + "..."
            : info.name}
        </Text>
        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            fontFamily: "Poppins",
            color: "gray",
          }}
        >
          {info && info.description.length > 70
            ? info.description.slice(0, 70) + "..."
            : info.description}
        </Text>
        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            fontFamily: "Poppins",
            color: "green",
          }}
        >
          Available in Stock: {info && info.countInStock}
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: "yellowgreen",
            fontFamily: "Poppins",
          }}
        >
          &#x20A6; {info && info.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
