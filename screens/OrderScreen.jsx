import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { checkUserLogin } from "../utils";
import axios from "axios";
import { API_URL } from "../config";
import LottieView from "lottie-react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { OrderCardView } from "../components";

export default function OrderScreen({ navigation }) {
  const [userOrders, setUserOrders] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    checkUserLogin(setUserData, setUserLogin);
  }, []);

  useEffect(() => {
    getUserOrders();
  }, [userData?._id]);
  const getUserOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/api/orders/${userData?._id}`
      );
      if (response.status === 200) {
        setUserOrders(response?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="mx-4 flex-1">
      <View className="flex-row w-full justify-start items-center  rounded-full p-1 mt-4 mb-14">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text className="  ml-2 text-xl" style={{ fontFamily: "semibold" }}>
          Orders
        </Text>
      </View>
      {isLoading ? (
        <LottieView
          style={{ width: "100%", height: 150 }}
          source={require("../assets/images/loading.json")}
          autoPlay
          loop
        />
      ) : userOrders.length > 0 ? (
        <View className="flex-1">
          <Text className="font-bold text-lg mb-4">Thông tin đặt hàng</Text>
          <View className="flex-1">
            <MasonryList
              contentContainerStyle={{
                paddingBottom: 20,
              }}
              data={userOrders}
              numColumns={1}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <OrderCardView item={item} navigation={navigation} />
              )}
            />
          </View>
        </View>
      ) : (
        <View className="flex items-center justify-center mt-10">
          <LottieView
            style={{ width: "100%", height: 150, marginBottom: 10 }}
            source={require("../assets/images/sad.json")}
            autoPlay
            loop
          />
          <Text>Không có đơn hàng nào!</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
