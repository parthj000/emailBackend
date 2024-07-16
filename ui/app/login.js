import { Link, router, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import LoginButton from "../components/LoginButton";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { MyContext } from "../components/AppContext";

const fetchToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      router.push("/welcome");
      return;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // fetchToken();
  }, []);

  return (
    <>
      <Toast />
      <View style={styles.container}>
        {/* <Image source={require("../assets/in.jpg")} style={styles.image} /> */}
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",

            marginBottom: 16,
          }}
        >
          Login
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Username or email"
          onChangeText={(val) => {
            setEmail(val);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(val) => {
            setPassword(val);
          }}
        />

        <LoginButton email={email} password={password} />

        <Text style={styles.optionText}>
          Don't have an account?{" "}
          <Link href="/signup" style={{ color: "blue" }}>
            Sign Up
          </Link>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  input: {
    height: 40,
    borderColor: "rgb(219 217 217)",
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
    borderRadius: 9,
    width: "100%",
  },
  signInButton: {
    color: "white",
    width: "100%",
    backgroundColor: "#007BFF",
    padding: 12,
    marginTop: 15,
    alignItems: "center",
    textAlign: "center",
    borderRadius: 10,
  },
  signInButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  optionText: {
    marginTop: 10,
    fontSize: 14,
    color: "rgb(80 84 89)",
  },
  image: {
    width: "119%",
    height: 300,
    marginBottom: 20,
    aspectRatio: "1/1",
  },
});
