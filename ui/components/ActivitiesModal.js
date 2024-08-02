import { StyleSheet, Text, View,Modal,Button,TextInput, TouchableNativeFeedback, TouchableOpacity, Pressable } from 'react-native'
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import Divder from './Divder';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActivitiesModal = (props) => {
  const { modalVisible, setModalVisible,activity,setActivity } = props;

  const [activities,setActivities] = useState([]);
    const [dataSend,setDataSend] = useState({});
    
    
return (
  <>
    {/* modals */}

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            padding: 50,
            minWidth: 300,
            elevation: 5,
            borderRadius: 15,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            
            {activity.display_name}
          </Text>

          {/* components */}
          {activity.slug==="E"?<TimeComp dropdownData={activity.subtypes} dataSend = {dataSend}  setDataSend={setDataSend}/>:null}

          

          {/* buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text>cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={()=>{
                console.log(dataSend,"this is the data need to be send");
              }}
              
            >
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    
  </>
);
}

export default ActivitiesModal








const TimeComp = (props) =>{
  const {dropdownData,dataSend,setDataSend} = props;
  const [showPicker,setShowPicker] = useState(false);
  const [time, setTime ] = useState("00:00");
  
  
  return (
    <>
      <View
        style={{
          marginBottom: 15,
        }}
      >
        <DropDownComponent
          datas={dropdownData}
          styles={excStyle.dropDown}
          setDataSend={setDataSend}
          dataSend={dataSend}
        />
        <Divder color="grey" height={0.5} />

        <View style={excStyle.time}>
          <Text style={excStyle.selectTime}>Select Time</Text>
          <TouchableOpacity
            onPress={() => {
              setShowPicker(true);
            }}
          >
            <Text style={excStyle.timeText}>{time}</Text>
          </TouchableOpacity>

          {console.log(dataSend)}
        </View>
        {showPicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="spinner"
            is24Hour={true}
            onChange={(event, time) => {
              setShowPicker(false);
              if (event.type === "set") {
                let hours = time.getHours().toString().padStart(2, "0");
                let minutes = time.getMinutes().toString().padStart(2, "0");

                setTime(`${hours}:${minutes}`);
                console.log(parseInt(hours) * 60 * 60 + parseInt(minutes) * 60);
                setDataSend({
                  ...dataSend,
                  duration: parseInt(hours) * 60 * 60 + parseInt(minutes) * 60,
                });
              }
            }}
          />
        )}
      </View>
    </>
  );
}







/***
 * 
 * 
 * @params 
 * 
 * 
 */


const DropDownComponent = (props) => {
  const { datas,  styles, dataSend,setDataSend } =
    props;
    const [selectedValue,setSelectedValue] = useState("");
    

  return (
    <Dropdown
      style={styles}
      data={datas}
      selectedTextStyle={{ fontSize: 15 }}
      labelField="display_name"
      valueField="id"
      placeholder="Select your routine"
      value={selectedValue}
      onChange={(item) => {
        setSelectedValue(item.value);
        setDataSend({
          ...dataSend,
          routineType: item.id,
        });
        console.log(item, "this is cool"); // Consider removing this in production
      }}
    />
  );
};




const styles = StyleSheet.create({
button:{
  backgroundColor:"#E1E1E1",
  elevation:4,
  padding:8,
  borderRadius:6
},
buttonContainer:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginTop:25,
}

})


const excStyle = StyleSheet.create({
  time: {
    width: "auto",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 6,
  },
  timeText: {
    backgroundColor: "#E1E1E1",
    paddingHorizontal: 4,
    borderRadius: 4,
    paddingVertical:1,
    fontSize:15,
  },
  dropDown:{
    
    marginBottom:6 
  },
  selectTime:{
    fontSize:15,
  }
});