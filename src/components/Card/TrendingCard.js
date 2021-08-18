import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { BASE_URL } from "../../redux/config";
import styles from "../../screens/Styles";

const TrendingCard = ({ containerStyle, info, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: 310,
        height: 150,
        marginTop: 10,
        marginRight: 20,
        borderRadius: 10,
        padding: 30,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <View>
        <Text style={[styles.textMedium, styles.textLight]}>{info.name}</Text>
        <Text style={[styles.textLarge, styles.textLight]}>{info.count}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TrendingCard;
