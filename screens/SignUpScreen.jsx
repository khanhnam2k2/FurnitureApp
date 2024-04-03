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
import { COLORS, SIZES } from "../constants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "../components";
import { Formik } from "formik";
import * as Yup from "yup";
import GlobalApi from "../GlobalApi";
import Toast from "react-native-toast-message";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Mật khẩu cần dài ít nhất 8 ký tự")
    .required("Mật khẩu là bắt buộc"),
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  location: Yup.string()
    .min(3, "Địa chỉ cần dài ít nhất 8 ký tự")
    .required("Địa chỉ là bắt buộc"),
  username: Yup.string()
    .min(3, "Tên cần dài ít nhất 8 ký tự")
    .required("Tên là bắt buộc"),
});

export default function SignUpScreen({ navigation }) {
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

  // Hàm đăng ký tài khoản
  const registerUser = (values) => {
    setLoader(true);
    const data = values;
    GlobalApi.register(data).then((resp) => {
      if (resp.status === 201) {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Đăng ký thành công!",
        });
        navigation.replace("Login");
      }
      setLoader(false);
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
            initialValues={{
              username: "",
              email: "",
              password: "",
              location: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => registerUser(values)}
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
                  <Text className="mb-1 me-1 text-right text-sm">
                    Tên của bạn
                  </Text>
                  <View
                    className="border h-12 flex-row rounded-lg px-3 items-center "
                    style={{
                      backgroundColor: COLORS.lightWhite,
                      borderColor: touched.username
                        ? COLORS.primary
                        : COLORS.offwhite,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="face-man-outline"
                      size={20}
                      color={COLORS.gray}
                    />
                    <TextInput
                      className="ml-2 flex-1"
                      placeholder="Nhập tên"
                      onFocus={() => {
                        setFieldTouched("username");
                      }}
                      onBlur={() => {
                        setFieldTouched("username", "");
                      }}
                      value={values.username}
                      onChangeText={handleChange("username")}
                      autoCorrect={false}
                    />
                  </View>
                  {touched.username && errors.username && (
                    <Text className="text-red-500 mt-1 ml-1 text-sm">
                      {errors.username}
                    </Text>
                  )}
                </View>
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
                <View className="mb-5 mx-5">
                  <Text className="mb-1 me-1 text-right text-sm">Vị trí</Text>
                  <View
                    className="border h-12 flex-row rounded-lg px-3 items-center "
                    style={{
                      backgroundColor: COLORS.lightWhite,
                      borderColor: touched.location
                        ? COLORS.primary
                        : COLORS.offwhite,
                    }}
                  >
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color={COLORS.gray}
                    />
                    <TextInput
                      className="ml-2 flex-1"
                      placeholder="Nhập vị trí"
                      onFocus={() => {
                        setFieldTouched("location");
                      }}
                      onBlur={() => {
                        setFieldTouched("location", "");
                      }}
                      value={values.location}
                      onChangeText={handleChange("location")}
                      autoCorrect={false}
                    />
                  </View>
                  {touched.location && errors.location && (
                    <Text className="text-red-500 mt-1 ml-1 text-sm">
                      {errors.location}
                    </Text>
                  )}
                </View>
                <Button
                  onPress={isValid ? handleSubmit : () => inValidForm()}
                  title={"ĐĂNG KÝ"}
                  isValid={isValid}
                  loader={loader}
                />
                <View className="flex-row mt-2 items-center justify-center">
                  <Text>Bạn đã có tài khoản?</Text>
                  <Text
                    className="text-center ml-1 font-bold"
                    style={{ color: COLORS.primary }}
                    onPress={() => navigation.navigate("Login")}
                  >
                    Đăng nhập ngay
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
