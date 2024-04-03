import React from "react";
import LottieView from "lottie-react-native";

export default function Loading({ width, height }) {
  return (
    <LottieView
      style={{
        width: width ? width : "100%",
        height: height ? height : 150,
      }}
      source={require("../../assets/images/loading.json")}
      autoPlay
      loop
    />
  );
}
