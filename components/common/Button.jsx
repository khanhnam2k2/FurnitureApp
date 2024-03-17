import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";

export default function Button({ title, onPress, isValid, loader }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-12 my-5 w-full justify-center items-center rounded-full "
      style={{
        backgroundColor: !isValid ? COLORS.gray : COLORS.primary,
      }}
    >
      {!loader ? (
        <Text className="font-bold text-base text-white">{title}</Text>
      ) : (
        <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
      )}
    </TouchableOpacity>
  );
}
