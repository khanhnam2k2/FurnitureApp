import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import { API_URL } from "../config";
import { ProductItemView } from "../components";
import LottieView from "lottie-react-native";
export default function SearchScreen() {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const handlePressSearch = () => {
    setIsSearched(true);
    searchProducts();
    setSearchResults([]);
  };
  const searchProducts = async () => {
    if (searchKey) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}/api/products/search/${searchKey}`
        );
        if (response && response.data) {
          setSearchResults(response.data);
        }
      } catch (error) {
        console.log("Failed to search");
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <SafeAreaView className="flex-1 m-4">
      {/* Search Bar */}
      <View
        className="flex-row justify-center items-center my-2 h-16 rounded-full p-2 mb-10"
        style={{ backgroundColor: COLORS.secondary }}
      >
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={24} color={COLORS.gray} />
        </TouchableOpacity>
        <View
          className="flex-1 rounded-full"
          style={{ backgroundColor: COLORS.secondary }}
        >
          <TextInput
            className="w-full h-full px-2"
            value={searchKey}
            onChangeText={(text) => setSearchKey(text)}
            placeholder="What are you looking for"
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => handlePressSearch()}
            className="w-12 h-full justify-center items-center rounded-lg"
          >
            <Feather name="search" size={30} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View style={{ marginTop: 24 }}>
          <LottieView
            style={{ width: "100%", height: 150 }}
            source={require("../assets/images/loading.json")}
            autoPlay
            loop
          />
          {/* <ActivityIndicator size="large" color={COLORS.primary} /> */}
        </View>
      ) : isSearched && searchResults.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 40,
            marginRight: 20,
          }}
        >
          <Image
            source={require("../assets/images/Pose23.png")}
            style={{ width: 300, height: 300, objectFit: "contain" }}
          />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductItemView item={item} />}
        />
      )}
    </SafeAreaView>
  );
}
