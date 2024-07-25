import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Calendar } from "react-native-big-calendar";
import { CalendarContext } from "./CalendarContext";
import dayjs from "dayjs";
import {
  PanGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");

export const fetchMonthEvents = async (
  setNext,
  setPrevious,
  obj,
  mode,
  setEvents
) => {
  try {
    var request;

    const token = await AsyncStorage.getItem("token");

    const baseurl = `${process.env.BACKEND_URI}/api/events?token=${token}`;

    if (JSON.stringify(obj) !== "{}") {
      let start = obj.startDate;
      let end = obj.endDate;
      request = `${baseurl}&startDate=${start}&endDate=${end}&mode=${mode}`;
      console.log(request)
    } else {
      request = `${baseurl}&mode=${mode}`;
      
    }
    console.log(
      request,
      "this is the request -------------------------------------------------------------------------"
    );

    const res = await fetch(request);
    const data = await res.json();
    

    setNext({
      startDate: data.next.startDate,
      endDate: data.next.endDate,
    });
    setPrevious({
      startDate: data.prev.startDate,
      endDate: data.prev.endDate,
    });
    setEvents(doEventsStructuring(data.events));


  } catch (err) {
    console.error(err);
  }
};

export function doEventsStructuring(events) {
  if (!events) {
    return [];
  }
  var newArr = [];
  for (let key of events) {
    const obj = {
      title: key.title,
      start: new Date(key.startDate * 1000),
      end: new Date(key.endDate * 1000),
    };
    newArr.push(obj);
  }
  
  return newArr;
}

const MonthView = () => {
  const { view, setView, currentDate, setCurrentDate, month, setMonth } =
    useContext(CalendarContext);
  const [newEvents, setEvents] = useState([]);
  const [previous, setPrevious] = useState({});
  const [next, setNext] = useState({});

  useEffect(() => {
    setMonth(dayjs(currentDate).month());
    fetchMonthEvents(setNext, setPrevious, {}, "M", setEvents).then(
      
    );
  }, []);

  const handleGesture = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      const { translationX } = nativeEvent;
      if (translationX < 0) {
        onSwipeLeft();
      } else if (translationX > 0) {
        onSwipeRight();
      }
    }
  };

  if (view !== "month") return null;

  const handleCell = (date) => {
    setView("day");
    setCurrentDate(date);
  };

  const onSwipeLeft = () => {
    console.log("Left----------------");

    setCurrentDate(dayjs(currentDate).add(1, "month").toDate());
    fetchMonthEvents(setNext, setPrevious, next, "M", setEvents);
  };

  const onSwipeRight = () => {
    console.log("right----------------------------");
    setCurrentDate(dayjs(currentDate).subtract(1, "month").toDate());
    fetchMonthEvents(setNext, setPrevious, previous, "M", setEvents);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Calendar
          events={newEvents} // Add your events here
          height={height}
          width={width}
          mode="month"
          date={currentDate}
        />
        <View style={styles.overlayContainer}>
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <View style={styles.leftHalf}></View>
          </PanGestureHandler>
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <View style={styles.rightHalf}></View>
          </PanGestureHandler>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
  },
  leftHalf: {
    width: width / 2,
    height: "100%",
    backgroundColor: "transparent",
  },
  rightHalf: {
    width: width / 2,
    height: "100%",
    backgroundColor: "transparent",
  },
});

export default MonthView;
