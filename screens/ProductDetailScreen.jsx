import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
export default function ProductDetailScreen() {
  const route = useRoute();
  const { item } = route.params;

  const navigation = useNavigation();
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View className="background-img flex-row justify-center">
        <Image
          source={{
            uri: item?.imageUrl,
          }}
          className="w-full aspect-square"
        />
      </View>
      <View className="w-full absolute flex-row justify-between items-center pt-10 ">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-4 bg-white"
        >
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>
        <TouchableOpacity className="p-2 rounded-full mr-4 bg-white">
          <Ionicons name="heart" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View
        className="detail-info -mt-4 rounded-tl-3xl rounded-tr-3xl p-6"
        style={{ backgroundColor: COLORS.lightWhite, width: SIZES.width }}
      >
        {/* Name and price product */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="font-bold" style={{ fontSize: SIZES.large }}>
            {item?.title}
          </Text>
          <View
            className="py-1 px-4 rounded-full"
            style={{ backgroundColor: COLORS.secondary }}
          >
            <Text className="font-bold" style={{ fontSize: SIZES.large }}>
              $ {item?.price}
            </Text>
          </View>
        </View>

        {/* Rating */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row gap-2 items-center">
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
            <Text>(4.9)</Text>
          </View>
          <View className="flex-row gap-4">
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons name="minus" size={24} />
            </TouchableOpacity>
            <Text className="font-bold" style={{ fontSize: SIZES.medium }}>
              {count}
            </Text>
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons name="plus" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Description */}
        <View className="description mb-6">
          <Text
            className="font-semibold mb-2"
            style={{ fontSize: SIZES.large - 2 }}
          >
            Description
          </Text>
          <Text className="text-justify" style={{ fontSize: SIZES.small }}>
            {item?.description}
          </Text>
        </View>

        {/* Location and Delivery */}
        <View
          className="flex-row justify-between items-center p-2 rounded-lg mb-6"
          style={{ backgroundColor: COLORS.secondary }}
        >
          <View className="flex-row gap-1 items-center">
            <Ionicons name="location-outline" size={24} />
            <Text>{item?.product_location}</Text>
          </View>
          <View className="flex-row gap-1 items-center">
            <MaterialCommunityIcons name="truck-delivery-outline" size={24} />
            <Text>Free Delivery</Text>
          </View>
        </View>

        {/*  */}
        <View className="flex-row justify-between items-center mb-6 gap-6">
          <TouchableOpacity
            className="flex-1 p-2 rounded-full"
            style={{ backgroundColor: COLORS.black }}
          >
            <Text
              className="text-white font-semibold text-center"
              style={{ fontSize: SIZES.medium }}
            >
              BUY NOW
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row justify-center items-center w-20 p-2 rounded-3xl"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Fontisto
              name="shopping-basket-add"
              size={24}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}