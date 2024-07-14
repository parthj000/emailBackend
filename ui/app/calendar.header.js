import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Touchable,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Calendar, Agenda, CalendarList } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Divider } from "react-native-paper";
import TaskComponent from "../components/TaskComponent";

const MyCalendar = () => {
  const [view, setView] = useState("month");
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    startDate: new Date(),
    endDate: new Date(),
  });
  const [datePickerVisible, setDatePickerVisible] = useState({
    start: false,
    end: false,
  });
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    setModalVisible(false);
    setNewEvent({ title: "", startDate: new Date(), endDate: new Date() });
  };

  const handleDateChange = (event, selectedDate, field) => {
    const currentDate = selectedDate || newEvent[field];
    setDatePickerVisible({ ...datePickerVisible, [field]: false });
    setNewEvent({ ...newEvent, [field]: currentDate });
  };

  const renderItem = (item) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  useEffect(() => {
    // Automatically scrolls to the current date when the component is loaded
    setCurrentDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleDayScroll = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === "next") {
      newDate.setDate(newDate.getDate() + 1);
    } else if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate.toISOString().split("T")[0]);
  };

  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      times.push(`${hour < 10 ? "0" : ""}${hour}:00`);
      times.push(`${hour < 10 ? "0" : ""}${hour}:30`);
    }
    return times;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.topHeaderText}>
          {new Date(currentDate).toDateString()}
        </Text>
      </View>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => setView("month")}
        >
          <Text style={styles.TopHeadText}>Month View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => setView("week")}
        >
          <Text style={styles.TopHeadText}>Week View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => setView("day")}
        >
          <Text style={styles.TopHeadText}>Day View</Text>
        </TouchableOpacity>
      </View>

      <Divider />

      {view === "day" && (
        <View style={styles.dayView}>
          {/* <TouchableOpacity onPress={() => handleDayScroll('prev')} style={styles.scrollButton}>
            <Text>Previous Day</Text>
          </TouchableOpacity> */}
          <ScrollView>
            <View style={styles.timelineContainer}>
              {generateTimeSlots().map((time, index) => (
                <View key={index} style={styles.timeSlot}>
                  <Text>{time}</Text>
                  {events
                    .filter((event) => {
                      const eventDate = new Date(event.startDate)
                        .toISOString()
                        .split("T")[0];
                      return eventDate === currentDate;
                    })
                    .map((event, idx) => {
                      const eventStart = new Date(event.startDate);
                      const eventEnd = new Date(event.endDate);
                      if (
                        time ===
                        eventStart.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      ) {
                        return (
                          <View key={idx} style={styles.eventItem}>
                            <Text>{event.title}</Text>
                          </View>
                        );
                      }
                    })}
                </View>
              ))}
            </View>
          </ScrollView>
          {/* <TouchableOpacity onPress={() => handleDayScroll('next')} style={styles.scrollButton}>
            <Text>Next Day</Text>
          </TouchableOpacity> */}
          <Divider />
        </View>
      )}

      {view === "month" && (
        <View style={{ height: "75%" }}>
          <CalendarList
            style={{}}
            current={currentDate}
            onDayPress={(day) => setCurrentDate(day.dateString)}
            markedDates={events.reduce((acc, event) => {
              const date = new Date(event.startDate)
                .toISOString()
                .split("T")[0];
              acc[date] = { marked: true };
              return acc;
            }, {})}
          />

          <Divider />
        </View>
      )}

      {view === "week" && (
        <>
          {/* <Agenda
            items={events.reduce((acc, event) => {
              const date = new Date(event.startDate)
                .toISOString()
                .split("T")[0];
              if (!acc[date]) acc[date] = [];
              acc[date].push(event);
              return acc;
            }, {})}
            hideKnob={true}
            selected={currentDate}
            renderItem={renderItem}
          /> */}

          <TaskComponent />
        </>
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add Event</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Event</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={newEvent.title}
            onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
          />
          <TouchableOpacity
            onPress={() =>
              setDatePickerVisible({ ...datePickerVisible, start: true })
            }
          >
            <Text style={styles.datePickerText}>
              Start Date: {newEvent.startDate.toLocaleString()}
            </Text>
          </TouchableOpacity>
          {datePickerVisible.start && (
            <DateTimePicker
              value={newEvent.startDate}
              mode="datetime"
              // display="default"
              onChange={(e, date) => handleDateChange(e, date, "startDate")}
            />
          )}
          <TouchableOpacity
            onPress={() =>
              setDatePickerVisible({ ...datePickerVisible, end: true })
            }
          >
            <Text style={styles.datePickerText}>
              End Date: {newEvent.endDate.toLocaleString()}
            </Text>
          </TouchableOpacity>
          {datePickerVisible.end && (
            <DateTimePicker
              value={newEvent.endDate}
              mode="datetime"
              display="default"
              onChange={(e, date) => handleDateChange(e, date, "endDate")}
            />
          )}
          <Button title="Add Event" onPress={handleAddEvent} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  TopHeadText: {
    color: "blue",
    fontSize: 13,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  topHeader: {
    padding: 10,

    borderRadius: 5,
    marginBottom: 10,
  },
  topHeaderText: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  viewButton: {
    padding: 8,
    borderColor: "blue",
    borderWidth: 1,

    borderRadius: 5,
  },
  dayView: {
    flex: 1,
  },
  scrollButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  timelineContainer: {
    flex: 1,
  },
  timeSlot: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  eventItem: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#2391bf",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  modalContent: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: "#007aff",
    textAlign: "center",
    marginVertical: 10,
  },
  item: {
    backgroundColor: "#007BFF",
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
});

export default MyCalendar;
