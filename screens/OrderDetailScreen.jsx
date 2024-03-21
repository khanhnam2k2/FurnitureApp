import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import MasonryList from "@react-native-seoul/masonry-list";
import { ProductInCart, ProductInOrderList } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function OrderDetailScreen({ navigation }) {
  const route = useRoute();
  const { item } = route.params;
  return (
    <SafeAreaView className="mx-4 flex-1">
      <View className="flex-row w-full justify-start items-center  rounded-full p-1 mt-4 mb-14">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text className="  ml-2 text-xl" style={{ fontFamily: "semibold" }}>
          Order Detail
        </Text>
      </View>
      <View className="flex-1">
        <MasonryList
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          data={item.products}
          numColumns={2}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => <ProductInOrder item={item} index={i} />}
        />
      </View>
    </SafeAreaView>
  );
}
const ProductInOrder = ({ item, index }) => {
  let isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 300)
        .duration(600)
        .springify()}
    >
      <View
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
          marginBottom: 20,
        }}
      >
        <Image
          source={{ uri: item?.orderItem.imageUrl }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 25,
          }}
        />
        <Text className="font-semibold text-base ml-2 text-neutral-600">
          {item.orderItem.title} x {item.quantity}
        </Text>
      </View>
    </Animated.View>
  );
};
