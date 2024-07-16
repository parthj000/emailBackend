import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "./TopHeader";
const progress = () => {
  return (
    <>
      <Header title="Progress" />
      <View>
        <Text style={{ alignContent: "center" }}>Progress</Text>
      </View>
    </>
  );
};

export default progress;

const styles = StyleSheet.create({});
