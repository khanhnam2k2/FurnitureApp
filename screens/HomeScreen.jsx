import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { ProductRow, Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import Headings from "../components/home/Headings";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 mx-4">
      <StatusBar style="auto" />
      <View style={{ marginTop: SIZES.small }}>
        <View className="flex-row justify-between items-center">
          <Ionicons name="location-outline" size={24} />
          <Text style={styles.locationText}>Shanghai China</Text>
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.cartCount}>
              <Text className="text-xs">8</Text>
            </View>
            <TouchableOpacity>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 50,
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
