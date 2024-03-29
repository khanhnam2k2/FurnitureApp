import { View, Text, FlatList } from "react-native";
import React from "react";
import useFetch from "../../hook/useFetch";
import ProductCardView from "./ProductCardView";
import Loading from "../common/Loading";

export default function ProductRow() {
  const { data, isLoading, error } = useFetch();
  return (
    <View className="mt-4">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Text>Some thing went wrong</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductCardView item={item} />}
          horizontal
          contentContainerStyle={{
            columnGap: 16,
          }}
        />
      )}
    </View>
  );
}
