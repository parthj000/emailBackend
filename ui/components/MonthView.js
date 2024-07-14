import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { CalendarContext } from "./CalendarContext";
import TaskComponent from "./TaskComponent";

const MonthView = () => {
  const { view, currentDate, setCurrentDate } = useContext(CalendarContext);
  console.log(currentDate);

  if (view !== "month") return null;

  return (
    // <View style={{ height: "80%", borderBottomEndRadius: 50 }}>
    <>
      <Calendar
        markedDates={{
          [currentDate]: {
            selected: true,
            marked: true,
            selectedColor: "cyan",
          },
        }}
        current={currentDate}
        onDayPress={(day) => setCurrentDate(day.dateString)}
      />

      <TaskComponent />
    </>
    // </View>
  );
};

const styles = StyleSheet.create({});

export default MonthView;
