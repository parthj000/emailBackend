import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Divider from "./Divder"; // Ensure this is the correct import for your Divider component
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

const AddTask = () => {
  const data = [
    { label: 'No Repeat', value: 'no_repeat' },
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  const [date,setDate] = useState(new Date());
  const [startTime,setStartTime] = useState(new Date());
  const [endTime,setEndTime] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState('no_repeat');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');
  


  const hadleRespone = async() => {
    
    const data = {
      token:"",
      startDate:startTime.valueOf(),
      endDate:endTime.valueOf(),
      title:firstInput,
      discreption:secondInput,
      recurrence:selectedValue

    }
    console.log(data)
    try {
      const request =  await fetch("https://714a-2405-201-5c0e-88c3-f1b4-8141-4720-c526.ngrok-free.app/api/events",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjgzYWNlM2U0Yzg0ZGIyOTQxMmNhYjUiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE3MjE4MjEyMTgsImV4cCI6MTczNzM3MzIxOH0.2rpdjVJ7pQdjZPZKVuLzu5bc6Y_o2-GtviZfs21dpvw",
          startDate:startTime.valueOf(),
          endDate:endTime.valueOf(),
          title:firstInput,
          description:secondInput,
          recurrence:"weekly",
          category: "E",
  
  
        })
      })
      const res = await request.json();
      if(request.ok){
        Toast.show({
          type:"success",
          text1:"Event created succesfully",

        })

        // router.push("calendar")

        
        
      }
      console.log(res); 
      
    } catch (error) {
      console.log(error);
      Toast.show({
        type:"error",
        text1:"Event not created",

      })

    }

    
    
    
  };

  
  console.log(date);
  return (
    <>
   
   <View style={{position:"relative", zIndex:5}}>
    <Toast/>
    
    </View>
      <StatusBar barStyle="dark-content" backgroundColor="#92A0AD" />
      <View style={styles.container}>
      

          
        <View>
        
          <Text style={styles.header}>Add Event</Text>

        </View>

        <View style={styles.second}>
          <TextInput
            placeholder='Add title' 
            style={styles.title}
            value={firstInput}
            onChangeText={setFirstInput}/>
          <TextInput 
            placeholder='Add Description' 
            style={styles.description} 
            multiline={true} 
            value={secondInput}
            onChangeText={setSecondInput} />
          
        </View>

        {/* thia ua imoi */}

        <View style={styles.second}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={styles.input}>Select Date:</Text>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.date}>
              <Text>{date.toDateString()}</Text>
            </TouchableOpacity>
          </View>

          {showStartDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={
                (event,val) =>{
                  console.log(val,"thuasbdhsb");
                  setShowStartDatePicker(false)
                  setStartTime(val)
                    setEndTime(val)
                    setDate(val)
                    
                    console.log("sdjnsjd")
                    
                    
                    console.log(endTime+"sdkj"+startTime);
                    
                    
                }
              }
            />
          )}

          <Divider height={0.5} color={"grey"} />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.input}>Select Time:</Text>
            <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.date}>
              <Text>{startTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>

            {showStartTimePicker && (
              <DateTimePicker
                value={date}
                mode="time"
                display="spinner"
                onChange={(event, val) => {
                  setShowStartTimePicker(false);
                  setStartTime(val);
                  console.log(val.valueOf())
                  
                }}
              />
            )}

            <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.date}>
              <Text>{endTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
          </View>

          {showEndTimePicker && (
            <DateTimePicker
              value={date}
              mode="time"
              display="spinner"
              onChange={(event, val) => {
                setShowEndTimePicker(false);
                setEndTime(val);
                console.log(val.valueOf());
               
              }}
            />
          )}
        </View>

        <View style={styles.second}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={styles.label}>Repeat</Text>
            <Dropdown
              style={styles.dropdown}
              data={data}
              labelField="label"
              valueField="value"
              value={selectedValue}
              onChange={item => {
                setSelectedValue(item.value);
              }}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15 }}>
          <TouchableOpacity style={{ backgroundColor: "#EEEEEE", padding: 8, borderRadius: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={hadleRespone} style={{ backgroundColor: "#EEEEEE", padding: 8, borderRadius: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Add Event</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  lastButton: {
    backgroundColor: "#EEEEEE",
    borderRadius: 5,
    color: "black"
  },
  container: {
    paddingHorizontal: "5%",
    backgroundColor: "#92A0AD",
    height: "100%",
    width: "100%",
    flex: 1,
    rowGap: 25,
  },
  header: {
    marginTop: "5%",
    fontSize: 20,
    color: "black",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold"
  },
  title: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    padding: 2,
  },
  description: {
    borderBottomColor: "grey",
    padding: 2,
  },
  second: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    backgroundColor: "white",
    gap: 7,
    borderRadius: 5
  },
  date: {
    backgroundColor: "#EEEEEE",
    marginLeft: 25,
    padding: 4,
    borderRadius: 3,
    alignSelf: "flex-end"
  },
  dropdown: {
    width: "35%",
    justifyContent: "space-around",
    alignSelf: "flex-end"
  },
  input: {
    fontSize: 16,
    color: "black"
  },
  label: {
    fontSize: 16,
    color: "black"
  }
});
