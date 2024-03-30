import { View, FlatList } from "react-native";
import React from "react";
import ProductCardView from "./ProductCardView";
import Loading from "../common/Loading";
import LottieView from "lottie-react-native";

export default function ProductRow({ productList, isLoading }) {
  return (
    <View className="mt-4">
      {isLoading ? (
        <Loading />
      ) : productList?.length == 0 ? (
        <LottieView
          style={{ width: "100%", height: 150, marginBottom: 10 }}
          source={require("../../assets/images/sad.json")}
          autoPlay
          loop
        />
      ) : (
        <FlatList
          data={productList}
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
