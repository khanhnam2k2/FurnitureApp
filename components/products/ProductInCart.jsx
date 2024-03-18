import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { FadeInLeft } from "react-native-reanimated";

export default function ProductInCart({ item, onDeleteCartItem }) {
  return (
    <Animated.View
      entering={FadeInLeft.delay(200).duration(700).springify().damping(12)}
      className="flex-1 justify-between items-center mb-4 flex-row  p-4 rounded-lg"
      style={{ backgroundColor: COLORS.white }}
    >
      <View
        className="w-16 justify-center items-center rounded-lg"
        style={{ backgroundColor: COLORS.secondary }}
      >
        <Image
          source={{ uri: item?.cartItem?.imageUrl }}
          className="w-full h-16 rounded-lg "
        />
      </View>
      <View className="flex-1 ml-4">
        <Text className="font-bold text-base" style={{ color: COLORS.primary }}>
          {item?.cartItem?.title}
        </Text>
        <Text className="font-bold text-sm text-gray-400">
          {item?.cartItem?.supplier}
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="font-bold text-sm text-gray-400">
            ${item?.cartItem?.price} * {item?.quantity}
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="font-bold text-sm text-gray-400">Thành tiền:</Text>
            <Text
              className="font-bold text-base"
              style={{ color: COLORS.primary }}
            >
              ${item?.cartItem?.price * item?.quantity}
            </Text>
          </View>
        </View>
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
