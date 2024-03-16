import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import useFetch from "../../hook/useFetch";
import { COLORS, SIZES } from "../../constants";
import ProductCardView from "./ProductCardView";

export default function ProductList() {
  const { data, isLoading, error } = useFetch();
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center content-center">
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => <ProductCardView item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );
}
