import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Dimensions,ActivityIndicator } from "react-native";
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
  const [loading,setLoading]=useState(false);

  const [callOnce, setCallOnce] = useState(false);

  useEffect(() => {
    
    
    fetchMonthEvents(setNextweek, setPreviousweek, {}, "W", setEvents,setLoading);

  }, []);

 


  
  
  const onSwipeLeft = (nextweek) => {
    console.log("Swiped Left");
    fetchMonthEvents(setNextweek, setPreviousweek, nextweek, "W", setEvents,setLoading);
    setCurrentDate(dayjs(currentDate).add(1, "week").toDate());
  };

  const onSwipeRight = (previousweek) => {
    console.log("Swiped Right");
    fetchMonthEvents(
      setNextweek,
      setPreviousweek,
      previousweek,
      "W",
      setEvents,
      setLoading
    );
    setCurrentDate(dayjs(currentDate).subtract(1, "week").toDate());
  };

  const handleGesture = useCallback(
    ({ nativeEvent }) => {
      
      if (nativeEvent.state === State.END) {
        const { translationX, translationY } = nativeEvent;
        if (
          Math.abs(translationX) > Math.abs(translationY) &&
          Math.abs(translationX) > 30
        ) {
          if (translationX < 0) {
            
            onSwipeLeft(nextweek);
          } else if (translationX > 0) {
            
            onSwipeRight(previousweek);
          }
        }
      }
    },
    [currentDate, previousweek, nextweek]
  );

  return (

    <>
    {loading ? (
      <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
      <ActivityIndicator size="large" color="grey" />
      </View>
    ):
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
  }

  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomWeeklyComponent;
