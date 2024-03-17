import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
export default function ProductItemView({ item, onPressDelete }) {
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
        {onPressDelete && (
          <TouchableOpacity className="p-2" onPress={() => onPressDelete()}>
            <MaterialIcons
              name="delete-outline"
              size={30}
              color={COLORS.white}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
}
