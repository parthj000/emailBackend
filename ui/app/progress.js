import { StyleSheet, Text, View,SafeAreaView } from "react-native";
import React from "react";
import Header from "./TopHeader";
import UpcomingPage from "./demo"
const progress = () => {
  return (
    <>
      <Header title="Progress" />
      <UpcomingPage/>
      <View>
        
      </View>
    

      
    </>
  );
};

export default progress;

const styles = StyleSheet.create({});
