import React, { useState } from 'react';
import { StatusBar,Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import WeekView from "../components/WeekView";



const AddEvent = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [description, setDescription] = useState('');
  const [recurrence, setRecurrence] = useState('');
  

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  return (

    
    <View style={styles.centeredView}>
      
      <Modal
        animationType="slide"
        transparent={true}
        // visible={modalVisible}
        >

        <View style={styles.fullScreenView}>
        <StatusBar barStyle="dark-content" backgroundColor="#92A0AD" />
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Event</Text>

            <TextInput
              style={styles.input}
              placeholder="Add title"
              value={title}
              onChangeText={setTitle}
            />

            <View style={{flexDirection:"row",width:"100%",gap:24}}>

            <Pressable onPress={() => setShowStartDatePicker(true)}>
              <Text style={styles.input}>
                Start Date: {startDate.toDateString()}
              </Text>
            </Pressable>

            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowStartDatePicker(false);
                  if (date) setStartDate(date);
                }}
              />
            )}

            <Pressable onPress={() => setShowStartTimePicker(true)}>
              <Text style={styles.input}>
                {startTime.toLocaleTimeString()}
              </Text>
            </Pressable>
            {showStartTimePicker && (
              <DateTimePicker
                value={startTime}
                mode="time"
                display="default"
                onChange={(event, time) => {
                  setShowStartTimePicker(false);
                  if (time) setStartTime(time);
                }}
              />
            )}







            </View>


            <View style={{flexDirection:"row",width:"100%",gap:30}}>

            <Pressable onPress={() => setShowEndDatePicker(true)}>
              <Text style={styles.input}>
                End Date: {endDate.toDateString()}
              </Text>
            </Pressable>
            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowEndDatePicker(false);
                  if (date) setEndDate(date);
                }}
              />
            )}

<Pressable onPress={() => setShowEndTimePicker(true)}>
              <Text style={styles.input}>
                {endTime.toLocaleTimeString()}
              </Text>
            </Pressable>
            {showEndTimePicker && (
              <DateTimePicker
                value={endTime}
                mode="time"
                display="default"
                onChange={(event, time) => {
                  setShowEndTimePicker(false);
                  if (time) setEndTime(time);
                }}
              />
            )}

          </View>

            

            <TextInput
              style={styles.input}
              placeholder="Add Description"
              value={description}
              onChangeText={setDescription}
            />

            < View style={{width:"100%" ,backgroundColor: "#92A0AD"}}>
            <Text>Select the Recurrence</Text>
            <Picker 
              
            >
            
            <Picker.Item label="Weekly" value="1"  />
            <Picker.Item label="Monthly" value="2" />
            <Picker.Item label="Daily" value="3" />
            <Picker.Item label="None" value="4" />
            
            </Picker>
            

            </View>

            <View style={{marginTop:30,flexDirection:"row" ,gap:50}}>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => navigation.goBack()}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonAdd]}>
                
              <Text style={styles.textStyle}>Add Event</Text>
            </Pressable>

            </View>



          </View>
        </View>
      </Modal>

      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  fullScreenView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColr: "#92A0AD"
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: "#92A0AD",
    
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    
    borderRadius:5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    
    backgroundColor: '#C8D5E1',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    // borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
    width: '100%',
    
  },

  buttonAdd:{
    
    borderRadius:5,
    padding: 10,
    elevation: 2,
    backgroundColor: '#C8D5E1',
    
  }

});

export default AddEvent;
