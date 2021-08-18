import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { BASE_URL } from "../../redux/config";
import styles from "../../screens/Styles";

const CategoryCard = ({ containerStyle, info, onPress }) => {
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
          uri: `${BASE_URL}${info.orderItems[0].image}`,
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
        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            fontFamily: "Poppins",
          }}
        >
          {info && info.user.name}
        </Text>

        {info &&
          info.orderItems.map((item, index) => (
            <View style={styles.row} key={index}>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Poppins",
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Poppins",
                }}
              >
                Qty: {item.qty}
              </Text>
            </View>
          ))}

        <Text
          style={{
            fontSize: 12,
            color: "crimson",
            fontFamily: "Poppins",
          }}
        >
          &#x20A6; {info && info.totalPrice}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
