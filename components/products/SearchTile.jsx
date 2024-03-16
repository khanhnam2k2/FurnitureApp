import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

export default function SearchTile({ item }) {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail", { item })}
        className="flex-1 justify-between items-center mb-4 flex-row  p-4 rounded-lg"
        style={{ backgroundColor: COLORS.primary }}
      >
        <View
          className="w-16 justify-center items-center rounded-lg"
          style={{ backgroundColor: COLORS.secondary }}
        >
          <Image
            source={{ uri: item?.imageUrl }}
            className="w-full h-16 rounded-lg "
          />
        </View>
        <View className="flex-1 ml-4">
          <Text className="font-bold text-base text-white">{item?.title}</Text>
          <Text className="font-bold text-sm text-gray-400">
            {item?.supplier}
          </Text>
          <Text className="font-bold text-sm text-gray-400">
            $ {item?.price}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
