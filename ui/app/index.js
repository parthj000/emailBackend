import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Login from "./login";


import { MyContext, MyContextProvider } from "../components/AppContext";
import WeekView from "../components/WeekView";
import DayView from "./test";

const App = () => {
  return (
    <>
    
      <MyContextProvider>
        <Login/>
      </MyContextProvider>
    </>
  );
};

export default App;

styles = StyleSheet.create({});
