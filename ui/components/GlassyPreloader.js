import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { BlurView } from "@react-native-community/blur";

const { width, height } = Dimensions.get("window");

const GlassyPreloader = ({ visible, message }) => {
  //   if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  loaderContainer: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginTop: 10,
    color: "#000",
    fontSize: 16,
  },
});

export default GlassyPreloader;
