// MonthViewCalendar.js
import React from 'react';
import { Calendar } from 'react-native-calendars';
import { View, Text, StyleSheet } from 'react-native';

const MonthViewCalendar = ({ tasks }) => {
  const renderTaskTitles = (day) => {
    const formattedDate = day.dateString;
    const tasksForDay = tasks[formattedDate] || [];

    return (
      <View style={styles.dayContainer}>
        {tasksForDay.map((task, index) => (
          <Text key={index} style={styles.taskTitle}>{task.title}</Text>
        ))}
      </View>
    );
  };

  return (
    <Calendar
      dayComponent={({ date }) => renderTaskTitles(date)}
    />
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  taskTitle: {
    fontSize: 10,
    textAlign: 'center',
  },
});

export default MonthViewCalendar;
