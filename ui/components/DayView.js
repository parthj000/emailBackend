import React, { useState ,useContext, useEffect} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { Calendar } from 'react-native-big-calendar';
import { CalendarContext } from './CalendarContext';
import dayjs from 'dayjs';
import { fetchMonthEvents } from './MonthView';

const { width, height } = Dimensions.get('window');

const MyCalendarComponent = () => {
  const { view, setView, month, setMonth } =
    useContext(CalendarContext);
  const [currentDate, setCurrentDate] = useState(dayjs().toDate());
  const [newEvents, setEvents] = useState([]);
  const [previous, setPrevious] = useState({});
  const [next, setNext] = useState({});

  useEffect( () => {

    fetchMonthEvents(setNext, setPrevious, {}, "D", setEvents)
  },[]
  );



  if (view !== "day") return null;

  return (
    
      <View style={styles.container}>
        <Calendar
          events={newEvents} // Add your events here
          height={height}
          width={width}
          mode="day"
          date={currentDate}

          swipeEnabled={false}
        />
        
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  leftHalf: {
    width: width / 2,
    height: '100%',
    backgroundColor: 'transparent',
  },
  rightHalf: {
    width: width / 2,
    height: '100%',
    backgroundColor: 'transparent',
  },
});

export default MyCalendarComponent;
