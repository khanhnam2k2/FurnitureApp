import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { Loading, OrderCardView } from "../components";
import { AuthContext } from "../context/AuthContext";
import GlobalApi from "../GlobalApi";

export default function OrderScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserOrders();
  }, [user?._id]);

  // Hàm lấy danh sách đơn hàng của người dùng
  const getUserOrders = async () => {
    setIsLoading(true);
    GlobalApi.getUserOrders(user?._id).then((resp) => {
      if (resp.status === 200) {
        setUserOrders(resp?.data);
        setIsLoading(false);
      }
    });
  };

  return (
    <SafeAreaView className="mx-4 flex-1">
      <View className="flex-row w-full justify-start items-center  rounded-full p-1 mt-4 mb-14">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text className="  ml-2 text-xl" style={{ fontFamily: "semibold" }}>
          Đơn hàng
        </Text>
      </View>
      {isLoading ? (
        <Loading />
      ) : userOrders?.length > 0 ? (
        <View className="flex-1">
          <Text className="font-bold text-lg mb-4">Danh sách đơn đặt hàng</Text>
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
          <Text className="text-red-500">Không có đơn hàng nào!</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
