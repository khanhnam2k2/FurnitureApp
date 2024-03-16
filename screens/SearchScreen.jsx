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
          `http://192.168.1.123:3000/api/products/search/${searchKey}`
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
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : isSearched && searchResults.length === 0 ? (
        <View style={{ marginTop: 24, alignItems: "center" }}>
          <Text>No results found</Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
              {/* Bổ sung các thông tin khác cần hiển thị */}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
