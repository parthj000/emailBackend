import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";

async function signUp(email, username, password, setLoading) {
  setLoading(true);
  await fetch(`${process.env.BACKEND_URI}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
    }),
  })
    .then((res) => {
      if (res.status == 400 || res.status == 409 || res.status == 201) {
        return res.json();
      } else {
        throw new Error("Oops, Something went wrong !");
      }
    })
    .then((data) => {
      Toast.show({
        type: "success",
        text1: data.message,
      });
      console.log(data);
      setLoading(false);
    })
    .catch((error) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
      console.log(data);
      setLoading(false);
    });
}

const SignUpButton = ({ email, username, password }) => {
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
              await signUp(email, username, password, setLoading);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default SignUpButton;

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
