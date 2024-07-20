import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { CalendarContext } from "../components/CalendarContext";
import { useContext } from "react";
import { Calendar } from "react-native-big-calendar";



const { width } = Dimensions.get("window");

const CustomWeeklyCalendar = () =>{

  const events = [
    {
      title: 'Meeting with John',
      start: new Date(2024, 6, 20, 10, 0),
      end: new Date(2024, 6, 20, 11, 0),
      color: 'blue',
    },
    {
      title: 'Lunch with Sarah',
      start: new Date(2024, 6, 21, 12, 0),
      end: new Date(2024, 6, 21, 13, 0),
      color: 'green',
    },
    // Add more events as needed
  ];

  return(
    <View >
     
      <Calendar
        events={events}
        height={700}
        mode="week"
        locale="en"
      />
      
    </View>
  );
};


const style = StyleSheet.create({

})

export default CustomWeeklyCalendar;