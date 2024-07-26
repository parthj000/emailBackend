import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import dayjs from "dayjs";
import "dayjs/locale/en-gb"; // Import locales if needed

const screenWidth = Dimensions.get("window").width;
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const NewCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDayOfWeek = startOfMonth.day();
  const daysInMonth = endOfMonth.date();

  const events = [
    {
      title: "Event on 2024-07-11",
      timestamp: 1719858600000, // Timestamp in milliseconds
    },
    {
      title: "Event on 2024-07-15",
      timestamp: 1716405600000, // Timestamp in milliseconds
    },
    {
      title: "Event on 2024-07-22",
      timestamp: 1717701600000, // Timestamp in milliseconds
    },
  ];

  const previousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month").startOf("month"));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month").startOf("month"));
  };

  // Generate an array for the days to display
  const daysArray = Array.from({ length: 42 }, (_, i) => {
    if (i < startDayOfWeek || i >= startDayOfWeek + daysInMonth) {
      return null;
    }
    const date = i - startDayOfWeek + 1;
    const fullDate = currentMonth.set("date", date);
    const prevMonth = currentMonth.subtract(1, "month");
    console.log(fullDate.valueOf());
    return {
      fullDate: fullDate,
      timestamp: fullDate.valueOf(),
      events: events.filter((event) =>
        dayjs(event.timestamp).isSame(fullDate, "day")
      ),
    };
  });
  console.log(daysArray[2].events);

  const events0 = [
    { title: "Meeting", timestamp: dayjs("2024-07-11").valueOf() },
    { title: "Coffee Break", timestamp: dayjs("2024-07-15").valueOf() },
    { title: "Conference", timestamp: dayjs("2024-07-22").valueOf() },
  ];

  // Date to filter by
  const filterDate = dayjs("2024-07-15");

  // Filter events that match the filterDate
  const filteredEvents = events0.filter((event) =>
    dayjs(event.timestamp).isSame(filterDate, "day")
  );

  console.log(filteredEvents);

  // Render individual day cells
  const Daygrid = ({ item }) => {
    console.log(item);

    return (
      <TouchableOpacity
        style={styles.day}
        onPress={() => alert(`Selected day: `)}
      >
        <Text style={styles.dayText}>{item.fullDate}in</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Previous" onPress={previousMonth} />
        <Text style={styles.title}>{currentMonth.format("MMMM YYYY")}</Text>
        <Button title="Next" onPress={nextMonth} />
      </View>
      <View style={styles.dayNames}>
        {dayNames.map((day) => (
          <View key={day} style={styles.dayName}>
            <Text style={styles.dayNameText}>{day}</Text>
          </View>
        ))}
      </View>
      <FlatList
        data={daysArray}
        renderItem={({ item }) => {
          console.log(item);
          return <Daygrid item={item} />;
        }}
        numColumns={7}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No Days</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dayNames: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  dayName: {
    width: screenWidth / 7.5,
    alignItems: "center",
  },
  dayNameText: {
    fontWeight: "bold",
    color: "#333",
  },
  day: {
    width: screenWidth / 7.5,
    height: 120,
    // justifyContent: "center",
    // alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  dayText: {
    fontSize: 16,
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },
});

export default NewCalendar;
