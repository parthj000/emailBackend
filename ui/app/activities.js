import { StyleSheet, Text, View ,TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "./TopHeader";
import ActivitiesModal from "../components/ActivitiesModal";



const Activities = () => {
  const [modalVisible,setModalVisible] = useState(false);
  const [activities,setActivities] = useState([]);
  const [activity,setActivity] = useState({});
  
  useEffect(()=>{
    getActivities(setActivities)
  },[]);


  
  


  return (
    <>
      <View style={styles.container}>
        <Header />
        <ActivitiesModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          activity={activity}
          setActivities={setActivity}
         
          
        />

        <View style={styles.content}>
          <Text style={styles.Header}>Activity Log</Text>

          <View>
            {activities && activities.map((item, index) => (

              
              <View key={index}>
                <TouchableOpacity
                  onPress={() => {
                    console.log(item);
                    setModalVisible(true);
                    setActivity(item);
                    

                  }}
                  style={styles.activityList}
                >
                  <Text style={styles.title}>{item.display_name}</Text>
                </TouchableOpacity>
              </View>
                
            ))}
          </View>
        </View>
      </View>
    </>
  );
};


export default Activities;






const styles = StyleSheet.create({

  container:{
    flex:1,
  },
  content:{
    backgroundColor:"#92A0AD",
    width:"100%",
    height:"100%",
    alignItems:"center",
    paddingTop:"20%",
    
  },
  activityList:{
    
    backgroundColor:"#C8D5E1",
    paddingVertical:15,
    paddingHorizontal:70,
    alignItems:"center",
    justifyContent:"center",
    marginVertical:10,
    borderRadius:40,
    elevation:5,
    
    
    
    
  },
  title:{
    
    fontSize:18,
    fontWeight:"bold",
    fontFamily:"chunk"
  },
  Header:{
    fontSize:40,
    fontWeight:"bold",
    paddingBottom:20,
    fontFamily:"play",
    
  }
});



// functions

const getActivities = async (setActivities) => {
  console.log("sdkm");
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjgzYWNlM2U0Yzg0ZGIyOTQxMmNhYjUiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3MjI1OTQ1MzMsImV4cCI6MTczODE0NjUzM30.jmb6EjYhE2WjkGLqYinFfOabc7rUjE5MpS9L9vJ2scI`;

  // const token = await AsyncStorage.getItem("token");
  const res = await fetch(
    "https://d1c1-2405-201-5c0e-88c3-b1aa-1356-a31-2084.ngrok-free.app/api/activities",
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  console.log(data);
  setActivities(data.activities);
};




