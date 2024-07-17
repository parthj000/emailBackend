import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WelcomePage from "./welcome";
import Login from "./login";
import MyCalendar from "./calendar";
import TaskComponent from "../components/TaskComponent";
import UnderProgress from "./demo";
import R  from "./progress";

import MonthViewCalendar from "./test"

import { MyContext, MyContextProvider } from "../components/AppContext";

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
