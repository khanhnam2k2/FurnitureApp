import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants";
import { Ionicons, Fontisto, AntDesign } from "@expo/vector-icons";
import { ProductRow, Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import Headings from "../components/home/Headings";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { AuthContext } from "../context/AuthContext";
import GlobalApi from "../GlobalApi";

export default function HomeScreen() {
  const { user, isLogined, cartItemCount, setCartItemCount } =
    useContext(AuthContext);
  const navigation = useNavigation();
  const getCartItemCount = () => {
    GlobalApi.getCartItemCount(user?._id).then((resp) => {
      setCartItemCount(resp?.data?.itemCount);
    });
  };
  useEffect(() => {
    getCartItemCount(user?._id);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getCartItemCount();
    }, [user?._id])
  );
  return (
    <SafeAreaView className="flex-1 mx-4">
      <StatusBar style="auto" />
      <View style={{ marginTop: SIZES.small }}>
        <View className="flex-row justify-between items-center">
          <Ionicons name="location-outline" size={24} />
          <Text style={styles.locationText}>
            {user ? user.username : "Shaege China"}
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
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
        <ProductRow />
      </ScrollView>
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
