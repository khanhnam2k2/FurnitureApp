import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { Loading, ProductItemView } from "../components";
import LottieView from "lottie-react-native";
import GlobalApi from "../GlobalApi";
export default function SearchScreen() {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchKey) {
        searchProducts();
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => {
      clearTimeout(delaySearch);
    };
  }, [searchKey]);

  // Hàm tìm kiếm sản phẩm
  const searchProducts = async () => {
    if (searchKey) {
      setIsLoading(true);
      GlobalApi.searchProduct(searchKey).then((resp) => {
        if (resp.status === 200) {
          setSearchResults(resp?.data);
        }
        setIsLoading(false);
      });
    }
  };
  return (
    <SafeAreaView className="flex-1 m-4">
      {/* Thanh tìm kiếm */}
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
            placeholder="Bạn đang tìm kiếm gì"
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={searchProducts}
            className="w-12 h-full justify-center items-center rounded-lg"
          >
            <Feather name="search" size={30} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View style={{ marginTop: 24 }}>
          <Loading />
        </View>
      ) : searchResults.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 40,
            marginRight: 20,
          }}
        >
          <LottieView
            style={{ width: "100%", height: 150, marginBottom: 10 }}
            source={require("../assets/images/empty.json")}
            autoPlay
            loop
          />
          <Text>Không tìm thấy sản phẩm</Text>
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
