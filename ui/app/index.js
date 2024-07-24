import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Login from "./login";
import AddEvent from "../components/AddEvent";
import MyCalendarComponent from "./test";
import AddTask from "../components/AddTask";
import Toast from "react-native-toast-message";



const App = () => {
  return (
    <>
      <Toast />
    <AddTask/>
    </>
  );
};

export default App;
styles = StyleSheet.create({});
