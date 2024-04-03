import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { Loading, ProductInCart } from "../components";
import MasonryList from "@react-native-seoul/masonry-list";
import { useFocusEffect } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { AuthContext } from "../context/AuthContext";
import GlobalApi from "../GlobalApi";

export default function CartScreen({ navigation }) {
  const { user, isLogined } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (isLogined) {
      getCartList();
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (isLogined) {
        getCartList();
      } else {
        setCartData([]);
      }
    }, [])
  );

  // Hàm lấy danh sách sản phẩm trong giỏ hàng
  const getCartList = () => {
    setIsLoading(true);
    GlobalApi.getCartList(user?._id).then((resp) => {
      if (resp.status === 200) {
        calculateTotalPrice(resp.data[0]?.products);
        setCartData(resp?.data[0]?.products);
        setIsLoading(false);
      }
    });
  };

  // Hàm tính tổng tiền
  const calculateTotalPrice = (items) => {
    let total = 0;
    items?.forEach((item) => {
      total += item.cartItem.price * item.quantity;
    });
    setTotalPrice(total);
  };

  // Hàm xóa sản phẩm trong giỏ hàng
  const deleteCartItem = (cartItemId) => {
    GlobalApi.deteleCartItem(cartItemId).then((resp) => {
      getCartList();
    });
  };

  return (
    <SafeAreaView className="mx-4 flex-1">
      <View className="flex-row w-full justify-start items-center  rounded-full p-1 mt-4 mb-14">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text className="  ml-2 text-xl" style={{ fontFamily: "semibold" }}>
          Giỏ hàng
        </Text>
      </View>
      <View className="space-y-6 flex-1">
        {!isLogined ? (
          <View className="flex items-center justify-center mt-10">
            <LottieView
              style={{ width: "100%", height: 150, marginBottom: 10 }}
              source={require("../assets/images/sad.json")}
              autoPlay
              loop
            />
            <Text>Vui lòng đăng nhập để tiếp tục mua sắm!</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              className="mt-4 py-2 px-4 rounded-full "
              style={{ backgroundColor: COLORS.primary }}
            >
              <Text className="text-white text-base font-bold">
                Đăng nhập ngay
              </Text>
            </TouchableOpacity>
          </View>
        ) : isLoading ? (
          <Loading />
        ) : !cartData || cartData?.length === 0 ? (
          <View className="flex items-center justify-center mt-10">
            <LottieView
              style={{ width: "100%", height: 150, marginBottom: 10 }}
              source={require("../assets/images/sad.json")}
              autoPlay
              loop
            />
            <Text className="text-red-500">
              Không có sản phẩm nào trong giỏ hàng!
            </Text>
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
              data={cartData}
              numColumns={1}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ProductInCart
                  item={item}
                  onDeleteCartItem={() => deleteCartItem(item._id)}
                  getCartList={() => getCartList()}
                />
              )}
            />
            <View className="flex-1 p-2">
              <Text className="font-extrabold text-lg">Thông tin đơn hàng</Text>
              <View className="mt-4 flex-row items-center justify-between">
                <Text className="font-bold text-base text-gray-400">
                  Tổng tiền
                </Text>
                <Text
                  className="font-extrabold text-base"
                  style={{ color: COLORS.primary }}
                >
                  ${totalPrice}
                </Text>
              </View>
              <View className="mt-2 flex-row items-center justify-between">
                <Text className="font-bold text-base text-gray-400">
                  Phí vận chuyển
                </Text>
                <Text
                  className="font-extrabold text-base"
                  style={{ color: COLORS.primary }}
                >
                  $0
                </Text>
              </View>
              <View className="mt-2 flex-row items-center justify-between">
                <Text className="font-bold text-base text-gray-400">
                  Thanh toán
                </Text>
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
                  THANH TOÁN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
