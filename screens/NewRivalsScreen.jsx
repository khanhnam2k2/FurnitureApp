import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { ProductList } from "../components";

export default function NewRivalsScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1  bg-white">
      <View className="mx-4">
        <View
          className="flex-row w-full justify-between items-center  rounded-full p-2 mt-4"
          style={{ backgroundColor: COLORS.primary }}
        >
          <View className="flex-row items-center">
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
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <SimpleLineIcons name="bag" size={24} color={COLORS.lightWhite} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Product List */}
        <View className=" mt-10">
          <ProductList />
        </View>
      </View>
    </SafeAreaView>
  );
}
