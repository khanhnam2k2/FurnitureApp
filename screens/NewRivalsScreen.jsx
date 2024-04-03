import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { CategoryList, ProductList } from "../components";
import GlobalApi from "../GlobalApi";

export default function NewRivalsScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCategoryList();
    if (!activeCategory) {
      getProductList();
    } else {
      getProductByCategory();
    }
  }, []);

  // Hàm lấy danh sách danh mục sp
  const getCategoryList = () => {
    GlobalApi.getCategoryList().then((resp) => {
      if (resp.status === 200) {
        setCategoryList(resp?.data);
      }
    });
  };

  // Hàm lấy danh sách sản phẩm
  const getProductList = () => {
    setIsLoading(true);
    GlobalApi.getProductList().then((resp) => {
      if (resp.status === 200) {
        setProductList(resp?.data);
      }
      setIsLoading(false);
    });
  };

  // Hàm lấy danh sách sản phẩm theo danh mục
  const getProductByCategory = (categoryId) => {
    setIsLoading(true);
    GlobalApi.getProductByCategory(categoryId).then((resp) => {
      if (resp.status === 200) {
        setProductList(resp?.data);
      }
      setIsLoading(false);
    });
  };

  // Hàm thay đổi danh mục hiện tại
  const handChangeCategory = (categoryId) => {
    getProductByCategory(categoryId);
    setActiveCategory(categoryId);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 mx-4">
        <View
          className="flex-row w-full justify-between items-center  rounded-full p-2 mt-4"
          style={{ backgroundColor: COLORS.primary }}
        >
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-circle"
                size={30}
                color={COLORS.lightWhite}
              />
            </TouchableOpacity>
            <Text
              className=" text-white ml-2 text-lg"
              style={{ fontFamily: "semibold" }}
            >
              Danh sách sản phẩm
            </Text>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <SimpleLineIcons name="bag" size={24} color={COLORS.lightWhite} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Danh sách danh mục */}
        <View className="mt-10">
          <CategoryList
            categories={categoryList}
            activeCategory={activeCategory}
            handChangeCategory={handChangeCategory}
          />
        </View>

        {/* Danh sách sản phẩm */}
        <View className="flex-1 mt-5">
          <ProductList productList={productList} isLoading={isLoading} />
        </View>
      </View>
    </SafeAreaView>
  );
}
