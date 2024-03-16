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

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  location: Yup.string()
    .min(3, "Location must be at least 3 characters")
    .required("Required"),
  username: Yup.string()
    .min(3, "User name must be at least 3 characters")
    .required("Required"),
});

const inValidForm = () => {
  Alert.alert("Invalid Form", "Please provide all required fields", [
    {
      text: "Cancel",
      onPress: () => {},
    },
    { defaultIndex: 1 },
  ]);
};

export default function SignUpScreen({ navigation }) {
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(false);
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
            initialValues={{
              username: "",
              email: "",
              password: "",
              location: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
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
                  <Text className="mb-1 me-1 text-right text-sm">
                    User name
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
                      placeholder="Username"
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
                <View className="mb-5 mx-5">
                  <Text className="mb-1 me-1 text-right text-sm">Location</Text>
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
                      placeholder="Enter location"
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
                  title={"S I G N U P"}
                  isValid={isValid}
                />

                <Text
                  className="mt-4 text-center"
                  onPress={() => navigation.navigate("Login")}
                >
                  Login{" "}
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
