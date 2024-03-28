import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { AuthContext } from "../../context/AuthContext";
import GlobalApi from "../../GlobalApi";

export default function ProductItemView({ item, onPressDelete }) {
  const { user, isLogined, setCartItemCount } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const addToCart = () => {
    setLoading(true);
    const data = {
      userId: user?._id,
      cartItem: item?._id,
      quantity: 1,
    };
    if (isLogined) {
      GlobalApi.addToCart(data).then((resp) => {
        if (resp.status === 200) {
          // setCartItemCount((prev) => prev + 1);
          navigation.navigate("Cart");
        }
      });
    } else {
      navigation.navigate("Login");
    }
    setLoading(false);
  };
  return (
    <Animated.View entering={FadeInDown.duration(700).springify().damping(12)}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail", { item })}
        className="flex-1 justify-between items-center mb-4 flex-row  p-4 rounded-lg"
        style={{ backgroundColor: COLORS.primary }}
      >
        <View
          className="w-16 justify-center items-center rounded-lg"
          style={{ backgroundColor: COLORS.secondary }}
        >
          <Image
            source={{ uri: item?.imageUrl }}
            className="w-full h-16 rounded-lg "
          />
        </View>
        <View className="flex-1 ml-4">
          <Text className="font-bold text-base text-white">{item?.title}</Text>
          <Text className="font-bold text-sm text-gray-400">
            {item?.supplier}
          </Text>
          <Text className="font-bold text-sm text-gray-400">
            $ {item?.price}
          </Text>
        </View>

        <TouchableOpacity onPress={() => addToCart()}>
          {loading ? (
            <ActivityIndicator size={24} color={COLORS.white} />
          ) : (
            <Ionicons name="add-circle" size={30} color={COLORS.white} />
          )}
        </TouchableOpacity>

        {onPressDelete && (
          <TouchableOpacity
            className="p-2 ml-4"
            onPress={() => onPressDelete()}
          >
            <MaterialIcons
              name="delete-outline"
              size={30}
              color={COLORS.white}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
