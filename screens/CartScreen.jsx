import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { ProductInCart } from "../components";
import { API_URL } from "../config";
import { checkUserLogin } from "../utils";
import axios from "axios";
import MasonryList from "@react-native-seoul/masonry-list";
import { useFocusEffect } from "@react-navigation/native";
import LottieView from "lottie-react-native";

export default function CartScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    checkUserLogin(setUserData, setUserLogin);
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkUserLogin(setUserData, setUserLogin);
      if (userData) {
        getCartList();
      }
    }, [])
  );
  useEffect(() => {
    if (userData) {
      getCartList();
    }
  }, [userData]);
  const getCartList = async () => {
    setIsLoading(true);
    try {
      const endpoint = `${API_URL}/api/cart/find/${userData?._id}`;
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        setCartData(response?.data[0]);
        calculateTotalPrice(response.data[0]?.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const calculateTotalPrice = (items) => {
    let total = 0;
    items?.forEach((item) => {
      total += item.cartItem.price * item.quantity;
    });
    setTotalPrice(total);
  };
  const deleteCartItem = (cartItemId) => {
    handleDeleteCartItem(cartItemId);
  };
  const handleDeleteCartItem = async (cartItemId) => {
    try {
      const response = await axios.delete(`${API_URL}/api/cart/${cartItemId}`);
      if (response.status === 200) {
        console.log(4);
        getCartList();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="mx-4 flex-1">
      <View className="flex-row w-full justify-start items-center  rounded-full p-1 mt-4 mb-14">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text className="  ml-2 text-xl" style={{ fontFamily: "semibold" }}>
          Cart
        </Text>
      </View>
      <View className="space-y-6 flex-1">
        {isLoading ? (
          <LottieView
            style={{ width: "100%", height: 150 }}
            source={require("../assets/images/loading.json")}
            autoPlay
            loop
          />
        ) : !cartData ||
          !cartData.products ||
          cartData.products.length === 0 ? (
          <View className="flex items-center justify-center mt-10">
            <Text>Không có sản phẩm nào trong giỏ hàng!</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              className="mt-4 py-2 px-4 rounded-full "
              style={{ backgroundColor: COLORS.primary }}
            >
              <Text className="text-white text-base font-bold">
                Mua sắm nào!
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-1">
            <MasonryList
              contentContainerStyle={{
                paddingBottom: 20,
              }}
              data={cartData.products}
              numColumns={1}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ProductInCart
                  item={item}
                  onDeleteCartItem={() => deleteCartItem(item._id)}
                />
              )}
            />
            <View className="flex-1 p-2">
              <Text className="font-extrabold text-lg">Order Info</Text>
              <View className="mt-4 flex-row items-center justify-between">
                <Text className="font-bold text-base text-gray-400">Total</Text>
                <Text
                  className="font-extrabold text-base"
                  style={{ color: COLORS.primary }}
                >
                  ${totalPrice}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CheckoutCart", {
                    cartData,
                    totalPrice,
                    orderType: "Cart",
                  })
                }
                className="mt-6 w-full rounded-full px-4 py-2"
                style={{ backgroundColor: COLORS.primary }}
              >
                <Text className="text-center text-white font-bold">
                  CHECKOUT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
