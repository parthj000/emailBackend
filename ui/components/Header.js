import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CalendarContext } from "./CalendarContext";
import { Divider } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";

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
  const [selectedValue, setSelectedValue] = useState("month");

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

  const data = [
    { label: "Daily", value: "day" },
    { label: "Weekly", value: "week" },
    { label: "Monthly", value: "month" },
  ];

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
            style={styles.dropdown}
            data={data}
            labelField="label"
            valueField="value"
            value={selectedValue}
            onChange={(item) => {
              setSelectedValue(item.value);
              setView(item.value); // Update the view based on the selected value
            }}
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
    width:"30%",
    marginLeft: 10,
    
  },
});

export default Header;
