import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import GlobalApi from "../../GlobalApi";
import Toast from "react-native-toast-message";
export default function ProductCardView({ item }) {
  const { user, isLogined, setCartItemCount } = useContext(AuthContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const getCartItemCount = () => {
    GlobalApi.getCartItemCount(user?._id).then((resp) => {
      setCartItemCount(resp?.data?.itemCount);
    });
  };
  const addToCart = () => {
    setLoading(true);
    const data = {
      userId: user?._id,
      cartItem: item?._id,
      quantity: 1,
    };
    if (isLogined) {
      GlobalApi.addToCart(data).then((resp) => {
        if (resp.status === 200) {
          getCartItemCount();
          Toast.show({
            type: "success",
            text1: "Thành công",
            text2: "Sản phẩm đươc thêm vào giỏ hàng thành công!",
          });
        }
      });
    } else {
      navigation.navigate("Login");
    }
    setLoading(false);
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
              {loading ? (
                <ActivityIndicator size={24} color={COLORS.primary} />
              ) : (
                <Ionicons name="add-circle" size={35} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
