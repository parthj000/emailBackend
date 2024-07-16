import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "./TopHeader";
import UpcomingPage from "./demo";
const activities = () => {
  return (
    <>
      <Header title="Activity" />
      <UpcomingPage/>
      
    </>
  );
};

export default activities;

const styles = StyleSheet.create({});
