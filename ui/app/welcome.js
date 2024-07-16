import { Link, router, useRouter, useRouteParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-native-paper";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WelcomePage() {
  const route = useRouter();
  const [goal, setGoal] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalvisible, setModalVisible] = useState(false);
  const fetchGoal = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");
      if (token) {
        const res = await fetch(
          `${process.env.BACKEND_URI}/api/goals?token=${token}`
        );
        const data = await res.json();

        if (!res.ok) {
          await AsyncStorage.removeItem("token");
          throw new Error("something went wrong");
        }
        setGoal(data.goals[0].goalText);
        setName(data.goals[0].username);
        console.log(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchGoal(setLoading);
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <View style={{ backgroundColor: "#ECECEC" }}>
          <ImageBackground
            style={styles.bgimage}
            source={require("../assets/welcome-bg.png")}
          ></ImageBackground>
          <View style={styles.first}>
            <Text style={styles.Welcome}>
              Welcome{" "}
              <Text style={{ color: "black", fontWeight: "bold" }}>Back,</Text>
            </Text>
            <Text style={styles.username}>{name} !</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalvisible);
              }}
            >
              <TextInput
                maxLength={25}
                style={styles.usernameGoal}
                editable={false}
                placeholder="set a goal for today"
              >
                {goal ? goal : "set up a goal"}
              </TextInput>
            </TouchableOpacity>
          </View>

          <View style={styles.second}>
            <TouchableOpacity
              style={styles.Actvitiy}
              onPress={() => route.push("/activities")}
            >
              <Image
                style={{ height: "80%", width: "100%" }}
                source={require("../assets/clock.png")}
              ></Image>
              <Text>Actvitiy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Calender}
              onPress={() => route.push("/calendar")}
            >
              <Image
                style={{ height: "80%", width: "100%" }}
                source={require("../assets/calendar.png")}
              ></Image>
              <Text>Calender</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Resources}
              onPress={() => route.push("/resources")}
            >
              <Image
                style={{ height: "80%", width: "100%" }}
                source={require("../assets/books.png")}
              ></Image>
              <Text>Resources</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Progress}
              onPress={() => route.push("/progress")}
            >
              <Image
                style={{ height: "80%", width: "100%" }}
                source={require("../assets/bars.png")}
              ></Image>
              <Text>Progress</Text>
            </TouchableOpacity>
          </View>
          {/* <ModalContainer
            setModalVisible={setModalVisible}
            modalvisible={modalvisible}
          /> */}
        </View>
      )}
    </>
  );
}

const ModalContainer = ({ modalvisible, setModalVisible }) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalvisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View>
          <Text>helloeckmdmckdmc</Text>
          <Button>cndjcn</Button>
        </View>
      </Modal>
    </>
  );
};

const styles3 = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableOpacity: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 8,
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
  },
});

const styles = StyleSheet.create({
  bgimage: {
    position: "absolute",
    top: -210,
    left: 0,
    right: 0,
    bottom: 0,
    width: 500,
    height: 505,
    zIndex: -1,
  },
  first: {
    paddingLeft: 40,
  },

  Welcome: {
    fontWeight: "bold",
    marginTop: "15%",
    fontSize: 40,
    color: "white",
  },
  username: {
    color: "white",
    fontSize: 25,
    fontWeight: "00",
  },

  usernameGoal: {
    marginTop: 35,
    width: "83%",
    backgroundColor: "white",
    textAlign: "left",
    height: 35,
    padding: 5,
    borderRadius: 25,
  },

  Goal: {
    marginTop: 5,
    width: "83%",

    textAlign: "center",
    height: 35,
    padding: 5,
    borderRadius: 25,
  },

  second: {
    paddingTop: 60,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    paddingLeft: 40,
    paddingBottom: "100%",
  },

  Actvitiy: {
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "white",
    width: "40%",
    height: 150,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  Calender: {
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,

    elevation: 5,
    backgroundColor: "white",
    width: "40%",
    height: 150,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  Resources: {
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "white",
    width: "40%",
    height: 150,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  Progress: {
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "white",
    width: "40%",
    height: 150,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
