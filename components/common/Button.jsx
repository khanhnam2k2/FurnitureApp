import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity
      className="h-12 my-5 w-full justify-center items-center rounded-full "
      style={{ backgroundColor: COLORS.primary }}
    >
      <Text className="font-bold text-base text-white">{title}</Text>
    </TouchableOpacity>
  );
}
