import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import { COLORS, SIZES } from "../constants";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function ProfileScreen({ navigation }) {
  const { user, setUser, isLogined, setIsLogined } = useContext(AuthContext);

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
  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to log out", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel"),
      },
      {
        text: "OK",
        onPress: () => {
          userLogout();
        },
      },
    ]);
  };

  const clearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want delete all saved data on your device ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel"),
        },
        {
          text: "Continue",
          onPress: () => console.log("clear cache "),
        },
        { defaultIndex: 1 },
      ]
    );
  };

  const deleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure you want delete Account ", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel"),
      },
      {
        text: "Continue",
        onPress: () => console.log("Delete Account"),
      },
      { defaultIndex: 1 },
    ]);
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
        {/* Background profile */}
        <View className="w-full">
          <Image
            source={require("../assets/images/space.jpg")}
            className="w-full h-64"
          />
        </View>

        {/* Profile info */}
        <View>
          <View className="flex items-center">
            <Image
              source={require("../assets/images/profile.jpeg")}
              className="w-36 h-36 rounded-full -mt-20 border-4"
            />
            <Text
              className="mt-2 text-base font-bold mb-2"
              style={{ color: COLORS.primary }}
            >
              {isLogined === false
                ? "Please login into your account"
                : user?.username}
            </Text>
            {isLogined === false ? (
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <View
                  style={{ backgroundColor: COLORS.secondary }}
                  className="px-4 py-2 rounded-full"
                >
                  <Text className="font-bold">L O G I N</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View
                style={{ backgroundColor: COLORS.secondary }}
                className="px-4 py-2 rounded-full"
              >
                <Text className="font-bold">
                  {isLogined === false
                    ? "Please login into your account"
                    : user?.email}
                </Text>
              </View>
            )}

            {isLogined === false ? (
              <View></View>
            ) : (
              <View
                className="mt-4 rounded-lg"
                style={{
                  backgroundColor: COLORS.lightWhite,
                  width: SIZES.width - SIZES.large,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Favourties")}
                >
                  <View className="flex-row border-b-2 border-gray-200 px-7 py-3 gap-4 items-center">
                    <MaterialCommunityIcons
                      name="heart-outline"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text
                      className="text-base font-bold"
                      style={{ color: COLORS.primary }}
                    >
                      Favorties
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
                  <View className="flex-row border-b-2 border-gray-200 px-7 py-3 gap-4 items-center">
                    <MaterialCommunityIcons
                      name="truck-delivery-outline"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text
                      className="text-base font-bold"
                      style={{ color: COLORS.primary }}
                    >
                      Orders
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                  <View className="flex-row border-b-2 border-gray-200 px-7 py-3 gap-4 items-center">
                    <SimpleLineIcons
                      name="bag"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text
                      className="text-base font-bold"
                      style={{ color: COLORS.primary }}
                    >
                      Cart
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteAccount()}>
                  <View className="flex-row  border-b-2 border-gray-200 px-7 py-3 gap-4 items-center">
                    <AntDesign
                      name="deleteuser"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text
                      className="text-base font-bold"
                      style={{ color: COLORS.primary }}
                    >
                      Delete account
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => logout()}>
                  <View className="flex-row  px-7 py-3 gap-4 items-center">
                    <AntDesign name="logout" size={24} color={COLORS.primary} />
                    <Text
                      className="text-base font-bold"
                      style={{ color: COLORS.primary }}
                    >
                      Logout
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
