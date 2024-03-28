import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import {
  CartScreen,
  CheckoutCartScreen,
  CheckoutScreen,
  FavourtiesScreen,
  LoginScreen,
  NewRivalsScreen,
  OrderDetailScreen,
  OrderScreen,
  ProductDetailScreen,
  SignUpScreen,
} from "./screens";
import { AuthContext } from "./context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState(null);
  const [isLogined, setIsLogined] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const onUserLoginState = async () => {
      const userLogin = await AsyncStorage.getItem("user");
      const userLoginParse = JSON.parse(userLogin);
      setUser(userLoginParse);
    };
    const onLoginState = async () => {
      const checkIsLogin = await AsyncStorage.getItem("isLogined");
      setIsLogined(checkIsLogin);
    };
    onUserLoginState();
    onLoginState();
  }, []);

  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLogined,
        setIsLogined,
        cartItemCount,
        setCartItemCount,
      }}
    >
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator>
          <Stack.Screen
            name="Bottom Navigation"
            component={BottomTabNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ProductList"
            component={NewRivalsScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Orders"
            component={OrderScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OrderDetail"
            component={OrderDetailScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Favourties"
            component={FavourtiesScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Checkout"
            component={CheckoutScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CheckoutCart"
            component={CheckoutCartScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
