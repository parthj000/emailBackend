import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function logIn2(email, password, setLoading) {
  try {
    setLoading(true);
    const res = await fetch(`${process.env.BACKEND_URI}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      console.log(data.token);
      await AsyncStorage.setItem("token", data.token);
      setLoading(false);
      router.push("/welcome");
      return;
    } else {
      Toast.show({
        type: "success",
        text1: data.message,
      });
      setLoading(false);
      return;
    }
  } catch (error) {
    Toast.show({
      type: "success",
      text1: error.message,
    });
    setLoading(false);
    console.log(error);
  }
}

const LoginButton = ({ email, password }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <ActivityIndicator size="small" color="#007BFF" />
      ) : (
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={async () => {
            try {
              await logIn2(email, password, setLoading);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <Text style={styles.signUpButtonText}>Log In</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  signUpButton: {
    width: "100%",
    backgroundColor: "#007BFF",
    padding: 12,
    marginTop: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  signUpButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});