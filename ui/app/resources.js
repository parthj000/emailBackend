import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "./TopHeader";

const resources = () => {
  return (
    <View>
      <Header title="Resources" />
      <Text style={{ alignContent: "center" }}> Resources </Text>
    </View>
  );
};

export default resources;

const styles = StyleSheet.create({});
