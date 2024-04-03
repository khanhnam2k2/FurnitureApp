import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
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

  // Hàm lấy số lượng sản phẩm trong giỏ hàng
  const getCartItemCount = () => {
    GlobalApi.getCartItemCount(user?._id).then((resp) => {
      setCartItemCount(resp?.data?.itemCount);
    });
  };

  // Hàm thêm sản phẩm vào giỏ hàng
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
            text2: "Thêm vào giỏ hàng thành công!",
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
        className="w-44 h-60 rounded-lg p-2 mx-2 mb-4"
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
          {/* Tên sản phẩm */}
          <Text
            className="font-bold mb-1"
            style={{ fontSize: SIZES.medium }}
            numberOfLines={1}
          >
            {item?.title}
          </Text>

          {/* Nhà sản xuất */}
          <Text
            style={{ color: COLORS.gray, fontSize: SIZES.small }}
            numberOfLines={1}
          >
            {item?.supplier}
          </Text>
          <View className="flex-row justify-between items-center">
            {/* Giá */}
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
