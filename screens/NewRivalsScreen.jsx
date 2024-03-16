import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { ProductList } from "../components";

export default function NewRivalsScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1  bg-white">
      <View className="mx-4">
        <View
          className="flex-row w-full justify-start items-center  rounded-full p-1 mt-4"
          style={{ backgroundColor: COLORS.primary }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>
          <Text
            className=" text-white ml-2 text-lg"
            style={{ fontFamily: "semibold" }}
          >
            Products
          </Text>
        </View>

        {/* Product List */}
        <View className=" mt-10">
          <ProductList />
        </View>
      </View>
    </SafeAreaView>
  );
}
