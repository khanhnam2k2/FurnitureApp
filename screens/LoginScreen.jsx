import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { Button } from "../components";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API_URL } from "../config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

export default function LoginScreen({ navigation }) {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(true);
  const inValidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      { defaultIndex: 1 },
    ]);
  };
  const handleLogin = (values) => {
    setResponseData(null);
    login(values);
  };
  const login = async (values) => {
    setLoader(true);
    try {
      const endpoint = `${API_URL}/api/login`;
      const data = values;
      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        setLoader(false);
        setResponseData(response.data);
        await AsyncStorage.setItem(
          `user${responseData._id}`,
          JSON.stringify(responseData)
        );
        await AsyncStorage.setItem("id", JSON.stringify(responseData._id));
        navigation.replace("Bottom Navigation");
      } else {
        Alert.alert("Error Logging in", "Please provide valid credentials", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          { defaultIndex: 1 },
        ]);
      }
    } catch (error) {
      Alert.alert("Error", "Oops, Error logging in try again", [
        {
          text: "Cancel",
          onPress: () => {},
        },
        { defaultIndex: 1 },
      ]);
    } finally {
      setLoader(false);
    }
  };
  return (
    <ScrollView>
      <SafeAreaView className="mx-5">
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-3 z-50"
          >
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <Image
            source={require("../assets/images/bk.png")}
            style={{
              height: SIZES.height / 2.4,
              width: SIZES.width - 60,
              resizeMode: "contain",
              marginBottom: 40,
            }}
          />
          <Text
            className="text-center font-extrabold mb-4 text-xl"
            style={{ color: COLORS.primary }}
          >
            Unlimited Luxurious Furniture
          </Text>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleLogin(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              values,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <View>
                <View className="mb-5 mx-5">
                  <Text className="mb-1 me-1 text-right text-sm">Email</Text>
                  <View
                    className="border h-12 flex-row rounded-lg px-3 items-center "
                    style={{
                      backgroundColor: COLORS.lightWhite,
                      borderColor: touched.email
                        ? COLORS.primary
                        : COLORS.offwhite,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                    />
                    <TextInput
                      className="ml-2 flex-1"
                      placeholder="Enter email"
                      onFocus={() => {
                        setFieldTouched("email");
                      }}
                      onBlur={() => {
                        setFieldTouched("email", "");
                      }}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text className="text-red-500 mt-1 ml-1 text-sm">
                      {errors.email}
                    </Text>
                  )}
                </View>
                <View className="mb-5 mx-5">
                  <Text className="mb-1 me-1 text-right text-sm">Password</Text>
                  <View
                    className="border h-12 flex-row rounded-lg px-3 items-center "
                    style={{
                      backgroundColor: COLORS.lightWhite,
                      borderColor: touched.password
                        ? COLORS.primary
                        : COLORS.offwhite,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                    />
                    <TextInput
                      className="ml-2 flex-1"
                      secureTextEntry={obsecureText}
                      placeholder="Password"
                      onFocus={() => {
                        setFieldTouched("password");
                      }}
                      onBlur={() => {
                        setFieldTouched("password", "");
                      }}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity
                      onPress={() => setObsecureText(!obsecureText)}
                    >
                      <MaterialCommunityIcons
                        name={obsecureText ? "eye-outline" : "eye-off-outline"}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text className="text-red-500 mt-1 ml-1 text-sm">
                      {errors.password}
                    </Text>
                  )}
                </View>
                <Button
                  loader={loader}
                  onPress={isValid ? handleSubmit : () => inValidForm()}
                  title={"L O G I N"}
                  isValid={isValid}
                />

                <Text
                  className="mt-4 text-center"
                  onPress={() => navigation.navigate("SignUp")}
                >
                  Register
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
