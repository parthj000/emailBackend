import React, { useContext } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { CalendarContext } from "./CalendarContext";

const DayView = () => {
  const { view, currentDate } = useContext(CalendarContext);

  if (view !== "day") return null;

  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      times.push(`${hour < 10 ? "0" : ""}${hour}:00`);
    }
    return times;
  };

  return (
    <View style={styles.dayView}>
      <ScrollView>
        <View style={styles.timelineContainer}>
          {generateTimeSlots().map((time, index) => (
            <View key={index} style={styles.timeSlot}>
              <Text style={{paddingTop:"50"}} >{time}</Text>
              <View
                style={{
                  backgroundColor: "grey",
                  flex: 1,
                  marginVertical: 2,
                  paddingLeft: 3,
                  alignItems:"center",
                  justifyContent:"center",
                  borderRadius:7,
                }}
              >
                <Text style={{ color: "white" }}>Activity at {time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dayView: {
    flex: 1,
  },
  timelineContainer: {
    flex: 1,

  },
  timeSlot: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
    flexDirection: "row",
    gap: 15,
  },
  eventItem: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 5,
    marginTop: 5,

  },
});

export default DayView;
