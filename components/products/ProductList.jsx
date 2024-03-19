import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import useFetch from "../../hook/useFetch";
import { COLORS, SIZES } from "../../constants";
import ProductCardView from "./ProductCardView";
import LottieView from "lottie-react-native";

export default function ProductList() {
  const { data, isLoading, error } = useFetch();
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center content-center mt-16">
        <LottieView
          style={{ width: "100%", height: 150 }}
          source={require("../../assets/images/loading.json")}
          autoPlay
          loop
        />
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
