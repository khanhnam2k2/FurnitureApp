import AsyncStorage from "@react-native-async-storage/async-storage";

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
