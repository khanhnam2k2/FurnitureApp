import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants";
import { Ionicons, Fontisto, AntDesign } from "@expo/vector-icons";
import { ProductRow, Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import Headings from "../components/home/Headings";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkUserLogin, getCartItemCount } from "../utils";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../config";
import Animated, { FadeInRight } from "react-native-reanimated";
export default function HomeScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  useEffect(() => {
    getCartItemCount(userData?._id);
    checkUserLogin(setUserData, setUserLogin);
  }, []);
  useFocusEffect(
    useCallback(() => {
      const fetchCartItemCount = async () => {
        try {
          const count = await getCartItemCount(userData?._id);
          setCartItemCount(count);
        } catch (error) {
          console.error("Error fetching cart item count:", error);
        }
      };

      fetchCartItemCount();
    }, [userData?._id])
  );
  return (
    <SafeAreaView className="flex-1 mx-4">
      <StatusBar style="auto" />
      <View style={{ marginTop: SIZES.small }}>
        <View className="flex-row justify-between items-center">
          <Ionicons name="location-outline" size={24} />
          <Text style={styles.locationText}>
            {userData ? userData.location : "Shaege China"}
          </Text>
          <View style={{ alignItems: "flex-end" }}>
            {userLogin ? (
              <Animated.View entering={FadeInRight.delay(200).duration(700)}>
                <View style={styles.cartCount}>
                  <Text className="text-xs">{cartItemCount}</Text>
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
        <ProductRow setCartItemCount={setCartItemCount} />
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
