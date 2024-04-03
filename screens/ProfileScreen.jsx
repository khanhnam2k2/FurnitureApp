import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, SIZES } from "../constants";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import GlobalApi from "../GlobalApi";
import Toast from "react-native-toast-message";

export default function ProfileScreen({ navigation }) {
  const { user, setUser, isLogined, setIsLogined } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(user?.avatar);

  // Xử lý đăng xuất
  const userLogout = async () => {
    try {
      navigation.replace("Bottom Navigation");
      setIsLogined(false);
      setUser(null);
      await AsyncStorage.multiRemove(["user", "isLogined"]);
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn bạn muốn đăng xuất?", [
      {
        text: "Hủy bỏ",
        onPress: () => console.log("cancel"),
      },
      {
        text: "Đồng ý",
        onPress: () => {
          userLogout();
        },
      },
    ]);
  };

  //
  /**
   * Hàm thay đổi avatar cho người dùng
   * @param String avatarUri - Đường dẫn ảnh
   */
  const updateAvatarUser = (avatarUri) => {
    const data = {
      avatar: avatarUri,
    };
    GlobalApi.updateProfileUser(user?._id, data).then((resp) => {
      if (resp.status === 200) {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Cập nhật ảnh đại diện thành công",
        });
      }
    });
  };
  const openImagePicker = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Cần có quyền truy cập vào cuộn camera!",
      });
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newAvatarUri = result.assets[0].uri;
      setAvatar(newAvatarUri);
      updateAvatarUser(newAvatarUri);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
      }}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
    >
      <View>
        {/* Ảnh nền trang cá nhân */}
        <View className="w-full">
          <Image
            source={require("../assets/images/space.jpg")}
            className="w-full h-64"
          />
        </View>

        <View>
          <View className="flex items-center">
            {/* ảnh đại diện */}
            <TouchableOpacity onPress={openImagePicker}>
              {avatar ? (
                <Image
                  source={{ uri: avatar }}
                  className="w-36 h-36 rounded-full -mt-20 border-4"
                />
              ) : (
                <Image
                  source={require("../assets/images/profile.jpeg")}
                  className="w-36 h-36 rounded-full -mt-20 border-4"
                />
              )}
            </TouchableOpacity>

            <Text
              className="mt-2 text-base font-bold mb-2"
              style={{ color: COLORS.primary }}
            >
              {isLogined === false
                ? "Vui lòng đăng nhập vào tài khoản của bạn"
                : user?.username}
            </Text>
            {isLogined === false ? (
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <View
                  style={{ backgroundColor: COLORS.secondary }}
                  className="px-4 py-2 rounded-full"
                >
                  <Text className="font-bold">Đăng nhập</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View
                style={{ backgroundColor: COLORS.secondary }}
                className="px-4 py-2 rounded-full"
              >
                <Text className="font-bold">{user?.email}</Text>
              </View>
            )}

            {isLogined === false ? (
              <View></View>
            ) : (
              // Menu cho người dùng
              <View
                className="mt-6 rounded-lg border"
                style={{
                  backgroundColor: COLORS.white,
                  width: SIZES.width - SIZES.large,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Favourties")}
                >
                  <View className="flex-row border-b-2 border-gray-200 px-4 py-4 gap-4 items-center mx-1">
                    <MaterialCommunityIcons
                      name="heart-outline"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text
                      className="text-base font-bold"
                      style={{ color: COLORS.primary }}
                    >
                      Đã thích
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
                  <View className="flex-row border-b-2 border-gray-200 px-4  py-4 gap-4 items-center mx-1">
                    <MaterialCommunityIcons
                      name="truck-delivery-outline"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text
                      className="text-base font-bold"
                      style={{ color: COLORS.primary }}
                    >
                      Đơn hàng
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                  <View className="flex-row border-b-2 border-gray-200 px-4  py-4 gap-4 items-center mx-1">
                    <SimpleLineIcons
                      name="bag"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text
                      className="text-base font-bold"
                      style={{ color: COLORS.primary }}
                    >
                      Giỏ hàng
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => logout()}>
                  <View className="flex-row  px-4 py-4 gap-4 items-center  mx-1">
                    <AntDesign name="logout" size={24} color={COLORS.primary} />
                    <Text
                      className="text-base font-bold"
                      style={{ color: COLORS.primary }}
                    >
                      Đăng xuất
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
