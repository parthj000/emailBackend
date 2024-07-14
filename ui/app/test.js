import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { CalendarContext } from "../components/CalendarContext";
import { useContext } from "react";
import moment from "moment";

const { width } = Dimensions.get("window");

const CustomWeeklyCalendar = () => {
  const { currentDate, setCurrentDate } = useContext(CalendarContext);
  const flatListRef = useRef(null);
  const [data, setData] = useState([
    { key: "prev" },
    { key: "current" },
    { key: "next" },
  ]);

  const getWeekDates = (startDate) => {
    const startOfWeek = moment(startDate).startOf("isoWeek");
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push(startOfWeek.clone().add(i, "days").format("YYYY-MM-DD"));
    }

    return weekDates;
  };

  const getNextWeek = (date) => {
    return moment(date).add(7, "days").format("YYYY-MM-DD");
  };

  const getPreviousWeek = (date) => {
    return moment(date).subtract(7, "days").format("YYYY-MM-DD");
  };

  const handleHorizontalScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.x > width / 2) {
      const newDate = getNextWeek(currentDate);
      setCurrentDate(newDate);
      setData([{ key: "current" }, { key: "next" }, { key: "new" }]);
    } else if (contentOffset.x < width / 2) {
      const newDate = getPreviousWeek(currentDate);
      setCurrentDate(newDate);
      setData([{ key: "new" }, { key: "prev" }, { key: "current" }]);
    }
    flatListRef.current.scrollToIndex({ index: 1, animated: false });
  };

  const renderItem = ({ item }) => {
    const weekDates = getWeekDates(currentDate);
    return (
      <View style={styles.weekContainer}>
        {weekDates.map((date) => (
          <TouchableOpacity
            key={date}
            style={styles.dayContainer}
            onPress={() => setCurrentDate(date)}
          >
            <Text style={styles.dayText}>{moment(date).format("ddd")}</Text>
            <Text
              style={[
                styles.dateText,
                date === currentDate && styles.selectedDate,
              ]}
            >
              {moment(date).format("D")}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        ref={flatListRef}
        onMomentumScrollEnd={handleHorizontalScroll}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        initialScrollIndex={1}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-around",

    width: width,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  dayContainer: {
    alignItems: "center",
  },
  dateText: {
    fontSize: 15,
    color: "black",
    
  },
  dayText:{
    fontSize:11,
    color:"grey",
  }
  ,
  selectedDate: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default CustomWeeklyCalendar;
