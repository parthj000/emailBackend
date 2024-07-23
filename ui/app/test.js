import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CalendarProvider, Agenda } from 'react-native-big-calendar';

const DayView = () => {
  return (
    <View style={styles.container}>
      <CalendarProvider>
        <Agenda
          items={{
            
            '2024-07-20': [
              { title: 'Meeting', start: '2024-07-20 09:00:00', end: '2024-07-20 10:00:00' },
              { title: 'Lunch', start: '2024-07-20 12:00:00', end: '2024-07-20 13:00:00' },
            ],
          }}
          selected={'2024-07-20'}
          renderItem={(item, firstItemInDay) => (
            <View style={styles.item}>
              <Text>{item.title}</Text>
              <Text>{item.start} - {item.end}</Text>
            </View>
          )}
        />
      </CalendarProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  item: {
    backgroundColor: '#F0F0F0',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});


export default DayView;



