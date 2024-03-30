import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import Animated, { FadeInUp } from "react-native-reanimated";
import { COLORS } from "../../constants";

export default function CategoryList({
  categories,
  activeCategory,
  handChangeCategory,
}) {
  return (
    <Animated.View entering={FadeInUp.duration(5000).springify()} className="">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat?._id == activeCategory;
          let activeButtonClass = isActive ? COLORS.primary : COLORS.gray2;
          return (
            <TouchableOpacity
              onPress={() => handChangeCategory(cat?._id)}
              key={index}
              className="flex items-center space-y-1"
            >
              <View
                className="rounded-full p-[6px]  "
                style={{ backgroundColor: activeButtonClass }}
              >
                <Image
                  source={{ uri: cat?.icon }}
                  className="rounded-full w-10 h-10"
                />
              </View>
              <Text
                className="text-sm font-bold"
                style={{ color: COLORS.primary }}
              >
                {cat?.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
