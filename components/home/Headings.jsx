import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
export default function Headings() {
  const navigation = useNavigation();
  return (
    <View className="mt-4">
      <View className="flex-row justify-between items-center">
        <Text style={{ fontSize: SIZES.large }} className="font-bold">
          New Rivals
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("ProductList")}>
          <Ionicons name="grid" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
