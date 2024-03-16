import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function ProductCardView({ item }) {
  const navigation = useNavigation();
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
            <TouchableOpacity>
              <Ionicons name="add-circle" size={35} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
