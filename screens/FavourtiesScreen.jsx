import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loading, ProductItemView } from "../components";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import GlobalApi from "../GlobalApi";
import { AuthContext } from "../context/AuthContext";
export default function FavourtiesScreen({ navigation }) {
  const { user, isLogined } = useContext(AuthContext);
  const [favouriteProducts, setFavouriteProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      getFavoriteProducts(user?._id);
    }
  }, [user]);

  // Hàm lấy danh sách sp yêu thích của người dùng
  const getFavoriteProducts = (userId) => {
    setIsLoading(true);
    GlobalApi.getFavoriteProducts(userId).then((resp) => {
      if (resp.status === 200) {
        setFavouriteProducts(resp?.data);
        setIsLoading(false);
      }
    });
  };

  // Hàm xóa sp yêu thích của người dùng
  const handleDeleteProductFromFavorites = (userId, productId) => {
    if (userId && productId) {
      GlobalApi.deleteProductFromFavorites(userId, productId).then((resp) => {
        if (resp.status === 200) {
          getFavoriteProducts(userId);
        }
      });
    }
  };

  return (
    <SafeAreaView className="mx-4">
      <View className="flex-row w-full justify-start items-center  rounded-full p-1 mt-4 mb-14">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text className="  ml-2 text-xl" style={{ fontFamily: "semibold" }}>
          Sản phẩm yêu thích
        </Text>
      </View>
      <View>
        {isLoading ? (
          <Loading />
        ) : favouriteProducts?.length === 0 ? (
          <View className="flex items-center justify-center mt-10">
            <LottieView
              style={{ width: "100%", height: 150, marginBottom: 10 }}
              source={require("../assets/images/sad.json")}
              autoPlay
              loop
            />
            <Text>Không có sản phẩm yêu thích nào!</Text>
          </View>
        ) : (
          <FlatList
            data={favouriteProducts}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ProductItemView
                item={item}
                onPressDelete={() =>
                  handleDeleteProductFromFavorites(user?._id, item?._id)
                }
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
