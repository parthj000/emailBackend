import React, { useContext } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Calendar } from "react-native-big-calendar";
import { CalendarContext } from "./CalendarContext";
import moment from "moment";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const events = [
  {
    title: 'Event 1',
    start: new Date(2024, 6, 20, 10, 0),
    end: new Date(2024, 6, 20, 12, 0),
    
  },
  {
    title: 'Event 2',
    start: new Date(2024, 6, 20, 10, 0),
    end: new Date(2024, 6, 20, 12, 0),
  },
  {
    title: 'Event 3',
    start: new Date(2024, 6, 20, 10, 0),
    end: new Date(2024, 6, 20, 12, 0),
  },
  {
    title: 'Event 4',
    start: new Date(2024, 6, 20, 10, 0),
    end: new Date(2024, 6, 20, 12, 0),
  },{
    title: 'Complete month few and day few before 22july ',
    start: new Date(2024, 6, 20, 10, 0),
    end: new Date(2024, 6, 20, 12, 0),
    dis:"yes doing this task are more important "
  },{
    title: 'Event 1',
    start: new Date(2024, 6, 20, 10, 0),
    end: new Date(2024, 6, 20, 12, 0),
  },{
    title: 'Event 1',
    start: new Date(2024, 6, 20, 10, 0),
    end: new Date(2024, 6, 20, 12, 0),
  },
  {
    title: 'Event 2',
    start: new Date(2024, 6, 21, 13, 0),
    end: new Date(2024, 6, 21, 14, 0),
  },
];

const MonthView = () => {
  console.log(currentDate +" month ")

  const { view,setView, currentDate, setCurrentDate } = useContext(CalendarContext);
  

  if (view !== "month") return null;
  // if (view !== "month") {
  //   return <View />;
  // }

  const handleDayPress = (day) => {
    setCurrentDate(day.dateString);
  };

  const handleCell = (date) =>{
    setView("day");
    setCurrentDate(date);
    console.log(date);
  }

  const navigation = useNavigation();
  

  return (
    <View style={styles.container}>
      <Calendar
        
        events={events}
        height={height}
        width={width}
        mode="month"
        swipeEnabled={true}
        showAdjacentMonths={true}
        onPressCell={handleCell}
        onPressEvent={(event) => console.log(event)}
        renderHeader={(date) => (
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {moment(date).format('MMMM YYYY')}
            </Text>
          </View>
        )}
        headerStyle={styles.headerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1E1E1',
  },
  header: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerStyle: {
    backgroundColor: '#f0f0f0',
  },
});

export default MonthView;
