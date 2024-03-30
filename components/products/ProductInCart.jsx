import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../constants";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import Animated, { FadeInLeft } from "react-native-reanimated";
import GlobalApi from "../../GlobalApi";
import Toast from "react-native-toast-message";

export default function ProductInCart({ item, onDeleteCartItem, getCartList }) {
  const [quantity, setQuantity] = useState(item?.quantity);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    const data = {
      cartItemId: item?._id,
      newQuantity: quantity + 1,
    };
    handleUpdateQuantity(data);
  };
  const handleUpdateQuantity = (data) => {
    GlobalApi.updateQuantityCart(data).then((resp) => {
      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Cập nhật thành công",
      });
      getCartList();
    });
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      const data = {
        cartItemId: item?._id,
        newQuantity: quantity - 1,
      };
      handleUpdateQuantity(data);
    }
  };

  return (
    <Animated.View
      entering={FadeInLeft.delay(200).duration(700).springify().damping(12)}
      className="p-4 pt-6 rounded-lg mb-4"
      style={{ backgroundColor: COLORS.white }}
    >
      <View className="flex-1 flex-row items-center justify-between">
        <View className="flex-1 flex-row">
          <View className="w-16 justify-center items-center rounded-lg">
            <Image
              source={{ uri: item?.cartItem?.imageUrl }}
              className="w-full h-16 rounded-lg "
            />
          </View>
          <View className="flex-1 ml-4">
            <Text
              className="font-bold text-base"
              style={{ color: COLORS.primary }}
            >
              {item?.cartItem?.title}
            </Text>
            <Text className="font-bold text-sm text-gray-400">
              {item?.cartItem?.supplier}
            </Text>
            <View className="">
              <Text className="font-bold text-sm text-gray-400">
                ${item?.cartItem?.price}
              </Text>
            </View>
          </View>
        </View>
        <View>
          {getCartList ? (
            <View className="flex-row gap-4">
              <TouchableOpacity
                disabled={quantity == 1}
                onPress={() => decrementQuantity()}
                style={{ opacity: quantity == 1 ? 0.2 : 1 }}
              >
                <SimpleLineIcons name="minus" size={20} />
              </TouchableOpacity>
              <Text className="font-bold text-sm">{quantity}</Text>
              <TouchableOpacity onPress={() => incrementQuantity()}>
                <SimpleLineIcons name="plus" size={20} />
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-row items-center gap-1">
              <Text className="font-bold text-sm text-gray-400">Số lượng:</Text>
              <Text
                className="font-bold text-base"
                style={{ color: COLORS.primary }}
              >
                {quantity}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View className="flex flex-row gap-2 justify-end">
        <Text className="font-bold text-sm text-gray-400">Thành tiền:</Text>
        <Text className="font-bold text-base" style={{ color: COLORS.primary }}>
          ${item?.cartItem?.price * item?.quantity}
        </Text>
      </View>
      {onDeleteCartItem && (
        <TouchableOpacity
          className="absolute right-0 top-0"
          onPress={() => onDeleteCartItem()}
        >
          <MaterialIcons name="cancel" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}
