import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { Button, ProductInCart } from "../components";
import MasonryList from "@react-native-seoul/masonry-list";
import { Formik } from "formik";
import * as Yup from "yup";
import { API_URL } from "../config";
import axios from "axios";

const validationSchema = Yup.object().shape({
  address: Yup.string()
    .min(8, "Address must be at least 8 characters")
    .required("Required"),
});
export default function CheckoutScreen({ navigation }) {
  const [loader, setLoader] = useState(false);
  const route = useRoute();
  const { cartData, totalPrice } = route.params;
  const checkout = async (values) => {
    setLoader(true);
    try {
      const endpoint = `${API_URL}/api/orders`;
      const response = await axios.post(endpoint, {
        userId: cartData.userId,
        address: values.address,
        products: cartData.products,
        total: totalPrice,
      });
      if (response.status === 201) {
        navigation.replace("Orders");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
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
        <MasonryList
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          numColumns={1}
          data={cartData?.products}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductInCart item={item} />}
        />
        <View className="flex-1 mt-4 p-2">
          <Text>Thanh toan</Text>
          <Formik
            className="flex-1"
            initialValues={{ address: "" }}
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
                  loader={loader}
                  onPress={isValid ? handleSubmit : () => console.log(2)}
                  title={"C H E C K  O U T"}
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
