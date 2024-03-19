import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductItemView } from "../components";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "../config";
import { checkUserLogin, handleAddToCart } from "../utils";
import LottieView from "lottie-react-native";
export default function FavourtiesScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [favouriteProducts, setFavouriteProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkUserLogin(setUserData, setUserLogin);
  }, []);

  useEffect(() => {
    if (userData) {
      getFavoriteProducts(userData._id);
    }
  }, [userData]);

  const getFavoriteProducts = async (userId) => {
    setIsLoading(true);
    try {
      const endpoint = `${API_URL}/api/user/${userId}/favorites`;
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        setFavouriteProducts(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteProductFromFavorites = (userId, productId) => {
    if (userId && productId) {
      deleteProductFromFavorites(userId, productId);
    }
  };
  const deleteProductFromFavorites = async (userId, productId) => {
    try {
      const endpoint = `${API_URL}/api/user/${userId}/product/${productId}`;
      console.log(endpoint);
      const response = await axios.delete(endpoint);
      if (response.status === 200) {
        getFavoriteProducts(userId);
      }
    } catch (error) {}
  };

  const addToCart = (userId, productId) => {
    handleAddToCart(setLoading, userId, productId, 1, userLogin, navigation);
  };
  return (
    <SafeAreaView className="mx-4">
      <View className="flex-row w-full justify-start items-center  rounded-full p-1 mt-4 mb-14">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text className="  ml-2 text-xl" style={{ fontFamily: "semibold" }}>
          Favorties
        </Text>
      </View>
      <View>
        {isLoading ? (
          <LottieView
            style={{ width: "100%", height: 150 }}
            source={require("../assets/images/loading.json")}
            autoPlay
            loop
          />
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
                  handleDeleteProductFromFavorites(userData._id, item._id)
                }
                onPressAddToCart={() => addToCart(userData._id, item._id)}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
