
import React, { useState } from 'react';
import { View, StyleSheet, Alert,Modal } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import AddEvent from "./AddEvent";


const FloatButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const actions = [
    {
      text: 'Add Event',
      // icon: require('./path-to-event-icon.png'),
      name: 'add_event',
      position: 1,
    },
    {
      text: 'Add Task',
      // icon: require('./path-to-task-icon.png'),
      name: 'add_task',
      position: 2,
    },
  ];

  
  const [events, setEvents] = useState([]);

  const handlePress = (name) => {
    if (name === 'add_event') {
      

      
      setModalVisible(true);
      
    } else if (name === 'add_task') {
      // Handle add task action
      Alert.alert('Add Task', 'Task button pressed');
    }
  };

  const handleSaveEvent = (event) => {
    setEvents([...events, event]);
  };

  return (

    <View style={styles.container}>

      <FloatingAction
        actions={actions}
        color="#92A0AD"
        onPressItem={handlePress}
      />

<Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <AddEvent 
            modalVisible={modalVisible} setModalVisible={setModalVisible} 
          />
        </View>
      </Modal>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default FloatButton;
