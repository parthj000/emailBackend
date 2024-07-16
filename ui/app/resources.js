import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "./TopHeader";
import UpcomingPage from "./demo"
const resources = () => {
  return (
    <>
    
      <Header title="Resources" />
      <UpcomingPage/>
      
    </>
  );
};

export default resources;

const styles = StyleSheet.create({});
