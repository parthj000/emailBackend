import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "./TopHeader";
const activities = () => {
  return (
    <>
      <Header title="Activity" />
      <View>
        <Text style={{ alignContent: "center" }}>activities</Text>
      </View>
    </>
  );
};

export default activities;

const styles = StyleSheet.create({});
