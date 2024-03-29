import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import Animated, { FadeInLeft, FadeInDown } from "react-native-reanimated";
import Lightbox from "react-native-lightbox-v2";
import { AuthContext } from "../context/AuthContext";
import GlobalApi from "../GlobalApi";

export default function ProductDetailScreen() {
  const { user, isLogined } = useContext(AuthContext);
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (user) {
      checkUserFavourite();
    }
  }, [user]);

  const checkUserFavourite = async () => {
    GlobalApi.checkUserFavourite(user?._id).then((resp) => {
      if (resp.status === 200) {
        const favoriteProducts = resp.data;
        const foundProduct = favoriteProducts.find(
          (product) => product._id === item._id
        );
        setIsFavourite(!!foundProduct);
      }
    });
  };

  const handleFavorite = async () => {
    const data = { userId: user?._id };
    GlobalApi.handleFavorite(item?._id, data).then((resp) => {
      if (resp.status === 200) {
        setIsFavourite(resp.data);
      }
    });
  };
  const addToCart = () => {
    if (isLogined) {
      setLoading(true);
      const data = {
        userId: user?._id,
        cartItem: item?._id,
        quantity: count,
      };
      GlobalApi.addToCart(data).then((resp) => {
        if (resp.status === 200) {
          navigation.navigate("Cart");
        }
        setLoading(false);
      });
    } else {
      navigation.navigate("Login");
    }
  };

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
      <Animated.View
        entering={FadeInLeft.delay(300)}
        className="background-img flex-row justify-center"
      >
        <Lightbox>
          <Image
            source={{
              uri: item?.imageUrl,
            }}
            className="w-full aspect-square"
          />
        </Lightbox>
      </Animated.View>
      <View className="w-full absolute flex-row justify-between items-center pt-10 ">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-4 bg-white"
        >
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            isLogined ? handleFavorite() : navigation.navigate("Login")
          }
          className="p-2 rounded-full mr-4 bg-white"
        >
          <Ionicons
            name="heart"
            size={30}
            color={isFavourite ? COLORS.red : COLORS.black}
          />
        </TouchableOpacity>
      </View>

      <View
        className="detail-info -mt-4 rounded-tl-3xl rounded-tr-3xl p-6"
        style={{ backgroundColor: COLORS.lightWhite, width: SIZES.width }}
      >
        {/* Name and price product */}
        <Animated.View
          entering={FadeInDown.duration(700).springify().damping(12)}
          className="flex-row justify-between items-center mb-6"
        >
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
        </Animated.View>

        {/* Rating */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
          className="flex-row justify-between items-center mb-6"
        >
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
        </Animated.View>

        {/* Description */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(700).springify().damping(12)}
          className="description mb-6"
        >
          <Text
            className="font-semibold mb-2"
            style={{ fontSize: SIZES.large - 2 }}
          >
            Description
          </Text>
          <Text className="text-justify" style={{ fontSize: SIZES.small }}>
            {item?.description}
          </Text>
        </Animated.View>

        {/* Location and Delivery */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(700).springify().damping(12)}
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
        </Animated.View>

        {/*  */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(700).springify().damping(12)}
          className="flex-row justify-between items-center mb-6 gap-6"
        >
          <TouchableOpacity
            onPress={() =>
              isLogined
                ? navigation.navigate("Checkout", {
                    item,
                    count,
                  })
                : navigation.navigate("Login")
            }
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
            disabled={loading}
            onPress={() => addToCart()}
            className="flex-row justify-center items-center w-20 p-2 rounded-3xl"
            style={{ backgroundColor: loading ? COLORS.gray : COLORS.primary }}
          >
            {loading ? (
              <ActivityIndicator size={24} color={COLORS.primary} />
            ) : (
              <Fontisto
                name="shopping-basket-add"
                size={24}
                color={COLORS.white}
              />
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
