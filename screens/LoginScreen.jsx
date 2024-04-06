import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { Button } from "../components";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import GlobalApi from "../GlobalApi";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Mật khẩu cần dài ít nhất 8 ký tự")
    .required("Mật khẩu là bắt buộc"),
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
});

export default function LoginScreen({ navigation }) {
  const { setUser, setIsLogined } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(true);

  // Hàm xử lý form lỗi
  const inValidForm = () => {
    Alert.alert("Lỗi", "Vui lòng cung cấp tất cả các trường bắt buộc", [
      {
        text: "Đồng ý",
        onPress: () => {},
      },
    ]);
  };

  // Hàm đăng nhập
  const login = (values) => {
    setLoader(true);
    const data = values;
    GlobalApi.login(data)
      .then((resp) => {
        if (!resp.data.error) {
          setIsLogined(true);
          setUser(resp?.data);
          AsyncStorage.setItem("isLogined", JSON.stringify(true));
          AsyncStorage.setItem("user", JSON.stringify(resp?.data));
          AsyncStorage.setItem("adStatus", "");
          navigation.replace("Bottom Navigation");
          setLoader(false);
        } else {
          setLoader(false);
          Alert.alert("Lỗi đăng nhập", resp?.data?.error, [
            {
              text: "Đồng ý",
              onPress: () => {},
            },
          ]);
        }
      })
      .catch((error) => {
        setLoader(false);
        Alert.alert(
          "Lỗi đăng nhập",
          "Đã xảy ra lỗi không mong muốn. Vui lòng kiểm tra kết nối Internet của bạn và thử lại sau.",
          [
            {
              text: "Hủy bỏ",
              onPress: () => {},
            },
          ]
        );
      });
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
            className="text-center font-extrabold mb-4 text-2xl"
            style={{ color: COLORS.primary }}
          >
            Nội thất sang trọng
          </Text>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
          >
            {({
              handleChange,
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
                      placeholder="example@gmail.com"
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
                  <Text className="mb-1 me-1 text-right text-sm">Mật khẩu</Text>
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
                      placeholder="Mật khẩu"
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
                        name={!obsecureText ? "eye-outline" : "eye-off-outline"}
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
                  title={"ĐĂNG NHẬP"}
                  isValid={isValid}
                />

                <View className="flex-row mt-4 items-center justify-center">
                  <Text>Bạn chưa có tài khoản?</Text>
                  <Text
                    className="text-center ml-1 font-bold"
                    style={{ color: COLORS.primary }}
                    onPress={() => navigation.navigate("SignUp")}
                  >
                    Đăng ký ngay
                  </Text>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
