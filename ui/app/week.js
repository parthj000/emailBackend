import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import { Calendar } from "react-native-big-calendar";
import dayjs from "dayjs";
import { fetchMonthEvents } from "../components/MonthView";
const { width, height } = Dimensions.get("window");

const CustomWeeklyComponent = () => {
  const [currentDate, setCurrentDate] = useState(dayjs().toDate());
  const [newEvents, setEvents] = useState([]);
  const [previousweek, setPreviousweek] = useState({});
  const [nextweek, setNextweek] = useState({});

  const [callOnce, setCallOnce] = useState(false);

  useEffect(() => {
    fetchMonthEvents(setNextweek, setPreviousweek, {}, "W", setEvents);
  }, []);

  useEffect(() => {
    console.log("Previous state:", previousweek);
    console.log("Next state:", nextweek);
  }, [previousweek, nextweek]);

  // const getWeekEvents = async (obj) => {
  //   try {
  //     const token = await AsyncStorage.getItem("token");
  //     let request;
  //     console.log(obj, "================this is the object");

  //     if (JSON.stringify(obj) === "{}") {
  //       request = `${process.env.BACKEND_URI}/api/events?token=${token}&mode=W`;
  //     } else {
  //       let start = obj.startDate;
  //       let end = obj.endDate;
  //       request = `${process.env.BACKEND_URI}/api/events?token=${token}&mode=W&startDate=${start}&endDate=${end}`;
  //     }

  //     const res = await fetch(request);
  //     const data = await res.json();

  //     if (data.prev && data.next) {
  //       console.log(data.prev, "Previous Dates");
  //       console.log(data.next, "Next Dates");

  //       setPreviousweek({
  //         startDate: data.prev.startDate,
  //         endDate: data.prev.endDate,
  //       });
  //       setNextweek({
  //         startDate: data.next.startDate,
  //         endDate: data.next.endDate,
  //       });
  //     } else {
  //       console.log("Invalid response structure:", data);
  //     }

  //     console.log(data, "Fetched Data");
  //   } catch (error) {
  //     console.error("Error fetching events:", error);
  //   }
  // };

  const onSwipeLeft = (nextweek) => {
    console.log("Swiped Left");
    fetchMonthEvents(setNextweek, setPreviousweek, nextweek, "W", setEvents);
    setCurrentDate(dayjs(currentDate).add(1, "week").toDate());
  };

  const onSwipeRight = (previousweek) => {
    console.log("Swiped Right");
    fetchMonthEvents(
      setNextweek,
      setPreviousweek,
      previousweek,
      "W",
      setEvents
    );
    setCurrentDate(dayjs(currentDate).subtract(1, "week").toDate());
  };

  const handleGesture = useCallback(
    ({ nativeEvent }) => {
      console.log("gesture call");
      if (nativeEvent.state === State.END) {
        const { translationX, translationY } = nativeEvent;
        if (
          Math.abs(translationX) > Math.abs(translationY) &&
          Math.abs(translationX) > 30
        ) {
          if (translationX < 0) {
            console.log("inside left");
            onSwipeLeft(nextweek);
          } else if (translationX > 0) {
            console.log("inside right");
            onSwipeRight(previousweek);
          }
        }
      }
    },
    [currentDate, previousweek, nextweek]
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <PanGestureHandler
          onGestureEvent={handleGesture}
          onHandlerStateChange={handleGesture}
          activeOffsetX={[-10, 10]} // Recognize horizontal swipes
          activeOffsetY={[-20, 20]} // Allow vertical scrolling to pass through
        >
          <View style={{ flex: 1 }}>
            <Calendar
              events={newEvents}
              height={height}
              width={width}
              mode="week"
              swipeEnabled={true}
              date={currentDate}
            />
          </View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomWeeklyComponent;
