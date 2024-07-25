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

          <Dropdown
            data={views}
            labelField="label"
            valueField="value"
            value={view}
            onChange={item => setView(item.value)}
            style={styles.dropdown}
            placeholder="Select view"
      />
          </View>
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
  dropdown: {
    height: 40,
    borderColor: '#C8D5E1',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    width: 150,
});

export default Header;
