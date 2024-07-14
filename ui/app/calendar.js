import React from "react";
import { View, StyleSheet } from "react-native";
import { CalendarProvider } from "../components/CalendarContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventModal from "../components/EventModal";
import DayView from "../components/DayView";
import WeekView from "../components/WeekView";
import MonthView from "../components/MonthView";
const MyCalendar = () => {
  return (
    <CalendarProvider>
      <View style={styles.container}>
        <Header />
        <DayView />
        <WeekView />
        <MonthView />
        <Footer />
        <EventModal />
      </View>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyCalendar;
