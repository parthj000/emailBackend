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

async function logIn(email, password, setLoading) {
  setLoading(true);
  await fetch(`${process.env.BACKEND_URI}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        router.push({
          pathname: "/welcome",
        });
      } else if (res.status == 400 || res.status == 401 || res.status == 400) {
        return res.json();
      }

      throw new Error("Oops, Something went wrong !");
    })
    .then((data) => {
      Toast.show({
        type: "success",
        text1: data.message,
      });
      setLoading(false);

      console.log(data);
    })
    .catch((error) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
      setLoading(false);
    });
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
              await logIn(email, password, setLoading);
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
