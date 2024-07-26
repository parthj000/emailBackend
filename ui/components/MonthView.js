import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import { Calendar } from "react-native-big-calendar";
import { CalendarContext } from "./CalendarContext";
import dayjs from "dayjs";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const MonthView = () => {
  const { view, setView, month, setMonth, newEvents, setEvents } =
    useContext(CalendarContext);
  // const [newEvents, setEvents] = useState([]);
  const [previous, setPrevious] = useState({});
  const [next, setNext] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMonth(dayjs());
    fetchMonthEvents(setNext, setPrevious, {}, "M", setEvents, setLoading);
  }, []);

  const handleSwipe = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      const { translationX, translationY } = nativeEvent;
      const swipeThreshold = 50; // Adjust this value to change swipe sensitivity

      // Check if the swipe is mostly horizontal
      if (
        Math.abs(translationX) > Math.abs(translationY) &&
        Math.abs(translationX) > swipeThreshold
      ) {
        if (translationX < 0) {
          onSwipeLeft();
        } else {
          onSwipeRight();
        }
      }
    }
  };

  const handleCell = (date) => {
    console.log("Cell pressed:", date);
    setMonth(date);
    setView("day");
  };

  const onSwipeLeft = () => {
    console.log("Swiped Left");
    setMonth(month.add(1, "month"));
    fetchMonthEvents(setNext, setPrevious, next, "M", setEvents, setLoading);
  };

  const onSwipeRight = () => {
    console.log("Swiped Right");
    setMonth(month.subtract(1, "month"));
    fetchMonthEvents(
      setNext,
      setPrevious,
      previous,
      "M",
      setEvents,
      setLoading
    );
  };

  if (view !== "month") return null;

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      ) : (
        <GestureHandlerRootView style={styles.container}>
          <PanGestureHandler
            onGestureEvent={handleSwipe}
            onHandlerStateChange={handleSwipe}
            activeOffsetX={[-10, 10]} // Adjust horizontal swipe sensitivity
            activeOffsetY={[-200, 200]} // Allow more vertical movement to pass through
          >
            <View style={styles.calendarWrapper}>
              <Calendar
                events={newEvents}
                onPressCell={handleCell}
                height={height}
                width={width}
                mode="month"
                swipeEnabled={false}
              />
            </View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarWrapper: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const fetchMonthEvents = async (
  setNext,
  setPrevious,
  obj,
  mode,
  setEvents,
  setLoading
) => {
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    const baseurl = `${process.env.BACKEND_URI}/api/events`;

    let request = `${baseurl}?mode=${mode}`;
    if (JSON.stringify(obj) !== "{}") {
      const { startDate, endDate } = obj;
      request = `${baseurl}?startDate=${startDate}&endDate=${endDate}&mode=${mode}`;
    }

    const res = await fetch(request, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    setNext({ startDate: data.next.startDate, endDate: data.next.endDate });
    setPrevious({ startDate: data.prev.startDate, endDate: data.prev.endDate });
    setEvents(doEventsStructuring(data.events));
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

export function doEventsStructuring(events) {
  if (!events) return [];
  return events.map((key) => ({
    title: key.title,
    start: new Date(key.startDate * 1000),
    end: new Date(key.endDate * 1000),
    color: "grey",
  }));
}

export default MonthView;
