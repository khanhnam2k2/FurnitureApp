import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { COLORS } from "../../constants";
import moment from "moment";
import "moment-timezone";
export default function OrderCardView({ item, navigation }) {
  const formattedDate = moment(item?.createdAt)
    .tz("Asia/Ho_Chi_Minh")
    .format("MMMM Do YYYY");
  return (
    <Animated.View
      entering={FadeInLeft.delay(200).duration(700).springify().damping(12)}
      className="flex-1 justify-between items-center mb-4 flex-row  p-4 rounded-lg"
      style={{ backgroundColor: COLORS.white }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("OrderDetail", { item })}
        className="flex-1"
      >
        <View className="flex-row gap-2 mb-2">
          <Text className="font-bold text-base">Ngày đặt hàng:</Text>
          <Text
            className="font-bold text-base"
            style={{ color: COLORS.primary }}
          >
            {formattedDate}
          </Text>
        </View>
        <View className="flex-row gap-2 mb-2">
          <Text className="font-bold text-base">Tổng tiền:</Text>
          <Text
            className="font-bold text-base"
            style={{ color: COLORS.primary }}
          >
            ${item?.total}
          </Text>
        </View>
        <View className="flex-row gap-2 mb-2">
          <Text className="font-bold text-base">Địa chỉ giao hàng:</Text>
          <Text
            className="font-bold text-base"
            style={{ color: COLORS.primary }}
          >
            {item?.address}
          </Text>
        </View>
        <View className="flex-row gap-2 mb-2">
          <Text className="font-bold text-base">Trạng thái giao hàng:</Text>
          <Text
            className="font-bold text-base"
            style={{ color: COLORS.primary }}
          >
            {item?.delivery_status}
          </Text>
        </View>

        <View className="flex-row items-center justify-end mt-3">
          <TouchableOpacity
            onPress={() => navigation.navigate("OrderDetail", { item })}
            className="px-4 py-2 rounded-full"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Text className="font-bold text-white">Xem chi tiết</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
