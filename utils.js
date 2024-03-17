import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./config";
import axios from "axios";
import { Alert } from "react-native";

export const checkUserLogin = async (setUserData, setUserLogin) => {
  try {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;
    const userCurrent = await AsyncStorage.getItem(userId);
    if (userCurrent !== null) {
      const parsedData = JSON.parse(userCurrent);
      setUserData(parsedData);
      setUserLogin(true);
    }
  } catch (error) {
    console.log(error);
  }
};

// Hàm xử lý thêm sản phẩm vào giỏ hàng
export const handleAddToCart = async (
  setLoading,
  userId,
  productId,
  quantity
) => {
  setLoading(true);
  try {
    const endpoint = `${API_URL}/api/cart/addToCart`;
    const response = await axios.post(endpoint, {
      userId: userId,
      cartItem: productId,
      quantity: quantity,
    });
    if (response.status === 200) {
      Alert.alert("Notification", response.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
