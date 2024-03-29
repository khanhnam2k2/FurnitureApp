import { View, FlatList } from "react-native";
import React from "react";
import useFetch from "../../hook/useFetch";
import ProductCardView from "./ProductCardView";
import Loading from "../common/Loading";

export default function ProductList() {
  const { data, isLoading, error } = useFetch();
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center content-center mt-16">
        <Loading />
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
