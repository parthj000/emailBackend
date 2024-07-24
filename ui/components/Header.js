import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CalendarContext } from "./CalendarContext";
import { Divider } from "react-native-paper";

const Header = () => {
  const {
    view,
    setView,
    currentDate,
    headerVisible,
    setHeaderVisible,
    month,
    setMonth,
  } = useContext(CalendarContext);

  const monthMap = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

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
          <Text style={styles.dateText}>{monthMap[month]}</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "transparent",
              padding: 4,
              borderRadius: 4,
              backgroundColor: "#C8D5E1",
              borderRadius: 5,
            }}
            onPress={() => {
              setHeaderVisible(!headerVisible);
            }}
          >
            <Text style={{ color: "black" }}>View</Text>
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
    backgroundColor: "#92A0AD",
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
    color: "black",
  },
  button: {
    padding: 7,
    borderColor: "#C8D5E1",

    borderWidth: 1,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#C8D5E1",
  },
  buttonText: {
    color: "black",
    fontSize: 13,
  },
});

export default Header;
