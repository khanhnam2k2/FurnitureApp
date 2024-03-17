import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { checkUserLogin, handleAddToCart } from "../../utils";
export default function ProductCardView({ item }) {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkUserLogin(setUserData, setUserLogin);
  }, []);

  const addToCart = () => {
    handleAddToCart(setLoading, userData._id, item._id, 1);
  };
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { item })}
    >
      <View
        className="w-44 h-60 rounded-lg p-2 mx-2"
        style={{ backgroundColor: COLORS.secondary }}
      >
        <View className="w-full rounded-md overflow-hidden">
          <Image
            source={{
              uri: item?.imageUrl,
            }}
            className="w-full h-28"
          />
        </View>
        <View className="p-2">
          <Text
            className="font-bold mb-1"
            style={{ fontSize: SIZES.medium }}
            numberOfLines={1}
          >
            {item?.title}
          </Text>
          <Text
            style={{ color: COLORS.gray, fontSize: SIZES.small }}
            numberOfLines={1}
          >
            {item?.supplier}
          </Text>
          <View className="flex-row justify-between items-center">
            <Text style={{ fontSize: SIZES.medium }} className="font-bold">
              ${item?.price}
            </Text>
            <TouchableOpacity disabled={loading} onPress={() => addToCart()}>
              <Ionicons name="add-circle" size={35} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
