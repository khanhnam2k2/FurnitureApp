import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

export default function Welcome() {
  const navigation = useNavigation();
  return (
    <View>
      <View className="w-full flex justify-center items-center text-center my-5">
        <View className="flex-row items-center">
          <Text className="font-extrabold text-4xl mt-2">Đồ nội thất</Text>
        </View>
        <Text
          className="font-extrabold text-4xl"
          style={{ color: COLORS.primary }}
        >
          Sang trọng nhất
        </Text>
      </View>
      <View
        className="flex-row justify-center items-center my-2 h-16 rounded-full p-2"
        style={{ backgroundColor: COLORS.secondary }}
      >
        <TouchableOpacity>
          <Feather name="search" size={24} color={COLORS.gray} />
        </TouchableOpacity>
        <View
          className="flex-1 rounded-full"
          style={{ backgroundColor: COLORS.secondary }}
        >
          <TextInput
            className="w-full h-full px-2"
            value=""
            onPressIn={() => navigation.navigate("Search")}
            placeholder="Bạn đang tìm kiếm gì"
          />
        </View>
        <View>
          <TouchableOpacity className="w-12 h-full justify-center items-center rounded-lg">
            <Ionicons name="camera-outline" size={30} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
