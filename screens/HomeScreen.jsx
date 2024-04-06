import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants";
import {
  Ionicons,
  Fontisto,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { ProductRow, Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import Headings from "../components/home/Headings";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { AuthContext } from "../context/AuthContext";
import GlobalApi from "../GlobalApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const { user, isLogined, cartItemCount, setCartItemCount } =
    useContext(AuthContext);
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [showAdPopup, setShowAdPopup] = useState(false);
  useEffect(() => {
    getCartItemCount(user?._id);
    getProductList();
    checkAdStatus();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getCartItemCount();
    }, [user?._id])
  );

  // Hàm lấy số lượng sản phẩm trong giỏ hàng
  const getCartItemCount = () => {
    GlobalApi.getCartItemCount(user?._id).then((resp) => {
      setCartItemCount(resp?.data?.itemCount);
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

  // Hàm check xem người dùng đã xem quảng cáo chưa
  const checkAdStatus = async () => {
    try {
      const adStatus = await AsyncStorage.getItem("adStatus");
      if (!adStatus) {
        setShowAdPopup(true);
      }
    } catch (error) {
      console.log("Error checking ad status:", error);
    }
  };

  // Hàm đóng quảng cáo
  const closeAdPopup = async () => {
    try {
      // Lưu trạng thái đã xem quảng cáo
      await AsyncStorage.setItem("adStatus", "viewed");
      setShowAdPopup(false);
    } catch (error) {
      console.log("Error saving ad status:", error);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 "
      style={{ backgroundColor: showAdPopup ? COLORS.gray2 : COLORS.white }}
    >
      <StatusBar style="auto" />
      <View className="flex-1 relative mx-4">
        {showAdPopup ? (
          <View
            className="absolute top-1/2 left-1/2"
            style={{
              transform: [{ translateX: -150 }, { translateY: -200 }],
              zIndex: 100,
            }}
          >
            <Image
              source={require("../assets/images/fn5.jpg")}
              style={{ width: 300, height: 400 }}
              className="object-contain rounded-xl"
            />
            <TouchableOpacity
              onPress={closeAdPopup}
              className="absolute top-0 right-0"
            >
              <MaterialIcons name="cancel" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}

        <View style={{ marginTop: SIZES.small }}>
          <View className="flex-row justify-between items-center">
            <Ionicons name="location-outline" size={24} />
            <Text style={styles.locationText}>
              {user ? "Xin chào, " + user.username : ""}
            </Text>
            <View style={{ alignItems: "flex-end" }}>
              {isLogined ? (
                <Animated.View entering={FadeInRight.delay(200).duration(700)}>
                  <View style={styles.cartCount}>
                    <Text className="text-xs text-white font-bold">
                      {cartItemCount}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                    <Fontisto name="shopping-bag" size={24} />
                  </TouchableOpacity>
                </Animated.View>
              ) : (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <AntDesign name="login" size={24} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 80,
          }}
        >
          <Welcome />
          <Carousel />
          <Headings />
          <ProductRow productList={productList} isLoading={isLoading} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  locationText: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  cartCount: {
    position: "absolute",
    bottom: 16,
    width: 16,
    left: 10,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "green",
    justifyContent: "center",
    zIndex: 999,
  },
});
