import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import ProductCardView from "./ProductCardView";
import LottieView from "lottie-react-native";

export default function ProductRow() {
  const { data, isLoading, error } = useFetch();
  return (
    <View className="mt-4">
      {isLoading ? (
        <LottieView
          style={{ width: "100%", height: 100 }}
          source={require("../../assets/images/loading.json")}
          autoPlay
          loop
        />
      ) : error ? (
        <Text>Some thing went wrong</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductCardView item={item} />}
          horizontal
          contentContainerStyle={{
            columnGap: SIZES.medium,
          }}
        />
      )}
    </View>
  );
}
