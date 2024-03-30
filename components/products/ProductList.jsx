import { View } from "react-native";
import React from "react";
import ProductCardView from "./ProductCardView";
import Loading from "../common/Loading";
import LottieView from "lottie-react-native";
import MasonryList from "@react-native-seoul/masonry-list";

export default function ProductList({ productList, isLoading }) {
  return (
    <View className="flex-1">
      {isLoading ? (
        <View className="flex-1 justify-center items-center content-center mt-16">
          <Loading />
        </View>
      ) : productList.length == 0 ? (
        <LottieView
          style={{ width: "100%", height: 150, marginBottom: 10 }}
          source={require("../../assets/images/sad.json")}
          autoPlay
          loop
        />
      ) : (
        <View className="flex-1">
          <MasonryList
            data={productList}
            keyExtractor={(item) => item?._id}
            numColumns={2}
            renderItem={({ item, i }) => (
              <ProductCardView item={item} index={i} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}
