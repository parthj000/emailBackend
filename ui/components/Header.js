import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CalendarContext } from "./CalendarContext";
import { Divider } from "react-native-paper";

const Header = () => {
  const { view, setView, currentDate, headerVisible, setHeaderVisible } =
    useContext(CalendarContext);

  return (
    <>
      <View style={styles.headerContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <Text style={styles.dateText}>
            {new Date(currentDate).toDateString()}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "transparent",
              padding: 4,
              borderRadius: 4,
            }}
            onPress={() => {
              setHeaderVisible(!headerVisible);
            }}
          >
            <Text style={{ color: "blue" }}>View</Text>
          </TouchableOpacity>
        </View>

        {headerVisible && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, view === "month" && styles.activeButton]}
              onPress={() => setView("month")}
            >
              <Text
                style={[
                  styles.buttonText,
                  view === "month" && styles.activeText,
                ]}
              >
                Month View
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, view === "week" && styles.activeButton]}
              onPress={() => setView("week")}
            >
              <Text
                style={[
                  styles.buttonText,
                  view === "week" && styles.activeText,
                ]}
              >
                Week View
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, view === "day" && styles.activeButton]}
              onPress={() => setView("day")}
            >
              <Text
                style={[styles.buttonText, view === "day" && styles.activeText]}
              >
                Day View
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
  },
  dateText: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  activeText: {
    color: "white",
  },
  button: {
    padding: 7,
    borderColor: "#007BFF",

    borderWidth: 1,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#007BFF",
  },
  buttonText: {
    color: "blue",
    fontSize: 13,
  },
});

export default Header;
