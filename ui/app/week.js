import { View, StyleSheet, Dimensions } from "react-native";

import { Calendar } from "react-native-big-calendar";

const CustomWeeklyCalendar = () => {
  const events = [
    {
      title: "Meeting with John",
      start: new Date(2024, 6, 20, 10, 0),
      end: new Date(2024, 6, 20, 11, 0),
      color: "blue",
    },
    {
      title: "Lunch with Sarah",
      start: new Date(2024, 6, 21, 12, 0),
      end: new Date(2024, 6, 21, 13, 0),
      color: "green",
    },
    // Add more events as needed
  ];

  return (
    <View>
      <Calendar
        events={events}
        height={700}
        mode="week"
        locale="en"
        onChangeDate={() => {
          console.log("fjdkj");
        }}
      />
    </View>
  );
};

export default CustomWeeklyCalendar;
