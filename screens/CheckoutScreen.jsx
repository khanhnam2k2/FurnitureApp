import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { Button } from "../components";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";
import GlobalApi from "../GlobalApi";

const validationSchema = Yup.object().shape({
  address: Yup.string()
    .min(8, "Address must be at least 8 characters")
    .required("Required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Required"),
});
export default function CheckoutScreen({ navigation }) {
  const { user, isLogined } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { item, count } = route.params;
  const inValidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields", [
      {
        text: "Cancel",
        onPress: () => {},
      },
    ]);
  };

  const checkout = (values) => {
    setLoading(true);
    const data = {
      userId: user?._id,
      address: values?.address,
      phone: values?.phone,
      products: {
        productId: item?._id,
        quantity: count,
      },
      total: item?.price * count,
      orderType: "buyNow",
    };
    GlobalApi.checkout(data).then((resp) => {
      if (resp.status === 201) {
        navigation.replace("Orders");
      }
      setLoading(false);
    });
  };
  return (
    <SafeAreaView className="mx-4 flex-1">
      <View className="flex-row w-full justify-start items-center  rounded-full p-1 mt-4 mb-14">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text className="  ml-2 text-xl" style={{ fontFamily: "semibold" }}>
          Checkout
        </Text>
      </View>
      <View className="flex-1">
        <View>
          <Image
            source={{ uri: item?.imageUrl }}
            className="w-full h-40 object-cover rounded-lg"
          />
        </View>
        <View className="flex-row items-center justify-between mt-3">
          <View className="flex-row gap-3 items-center">
            <Text className="text-2xl font-bold">{item?.title}</Text>
            <Text className="text-base">
              ${item?.price}x {count}
            </Text>
          </View>
          <View className="flex-row gap-1 items-center">
            <Text className="text-base">Thành tiền: </Text>
            <Text
              className="text-2xl font-bold"
              style={{ color: COLORS.primary }}
            >
              ${item.price * count}
            </Text>
          </View>
        </View>

        <View className="flex-1 mt-4 p-2">
          <Text>Thanh toan</Text>
          <Formik
            className="flex-1"
            initialValues={{ address: "", phone: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => checkout(values)}
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
              <View className="">
                <View className="mb-3 mx-5">
                  <Text className="mb-1 me-1 text-right text-sm">SDT</Text>
                  <View
                    className="border h-12 flex-row rounded-lg px-3 items-center"
                    style={{
                      backgroundColor: COLORS.lightWhite,
                      borderColor: touched.phone
                        ? COLORS.primary
                        : COLORS.offwhite,
                    }}
                  >
                    <Feather name="phone" size={20} color={COLORS.gray} />
                    <TextInput
                      className="ml-2 flex-1"
                      placeholder="Enter phone"
                      onFocus={() => {
                        setFieldTouched("phone");
                      }}
                      onBlur={() => {
                        setFieldTouched("phone", "");
                      }}
                      value={values.phone}
                      onChangeText={handleChange("phone")}
                      autoCapitalize="none"
                      keyboardType="numeric"
                    />
                  </View>
                  {touched.phone && errors.phone && (
                    <Text className="text-red-500 mt-1 ml-1 text-sm">
                      {errors.phone}
                    </Text>
                  )}
                </View>
                <View className="mb-5 mx-5">
                  <Text className="mb-1 me-1 text-right text-sm">Address</Text>
                  <View
                    className="border h-12 flex-row rounded-lg px-3 items-center"
                    style={{
                      backgroundColor: COLORS.lightWhite,
                      borderColor: touched.address
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
                      numberOfLines={5}
                      className="ml-2 flex-1"
                      placeholder="Enter address"
                      onFocus={() => {
                        setFieldTouched("address");
                      }}
                      onBlur={() => {
                        setFieldTouched("address", "");
                      }}
                      value={values.address}
                      onChangeText={handleChange("address")}
                      autoCapitalize="none"
                    />
                  </View>
                  {touched.address && errors.address && (
                    <Text className="text-red-500 mt-1 ml-1 text-sm">
                      {errors.address}
                    </Text>
                  )}
                </View>

                <Button
                  loader={loading}
                  onPress={isValid ? handleSubmit : () => inValidForm()}
                  title={
                    loading ? (
                      <ActivityIndicator size={24} color={COLORS.white} />
                    ) : (
                      "C H E C K  O U T"
                    )
                  }
                  isValid={isValid}
                />
              </View>
            )}
          </Formik>
        </View>
      </View>
    </SafeAreaView>
  );
}
