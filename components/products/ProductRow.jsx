import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ProductCardView from "./ProductCardView";
import Loading from "../common/Loading";
import GlobalApi from "../../GlobalApi";
import LottieView from "lottie-react-native";

export default function ProductRow() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getProductList();
  }, []);
  const getProductList = () => {
    setIsLoading(true);
    GlobalApi.getProductList().then((resp) => {
      if (resp.status === 200) {
        setProductList(resp?.data);
      }
      setIsLoading(false);
    });
  };
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
