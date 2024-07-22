import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MyContext, MyContextProvider } from "../components/AppContext";
import AddEvent from "../components/AddEvent";
import Login from "./login"

const App = () => {
  return (
    <>
      <AddEvent/>
      {/* <MyContextProvider>
        <Login/>
      </MyContextProvider> */}
    </>
  );
};

export default App;
styles = StyleSheet.create({});
