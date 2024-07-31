import { StyleSheet, Text, View ,TouchableOpacity} from "react-native";
import React, { useCallback } from "react";
import Header from "./TopHeader";
import Divder from "../components/Divder";
import { isLoaded, useFonts } from "expo-font";



const Activities = () => {


  
  
  const activityList = [
    { title: "Sleep" },
    { title: "Meditation" },
    { title: "Positive Affirmation" },
    { title: "Exercise" },
    { title: "Study" },
    
  ];

  return (
    <>
      <View style={styles.container}>

      <Header   />



      
        <View style={styles.content}>
          
        <Text style={styles.Header}>Activity Log</Text>


          <View>


            {activityList.map((item, index) => (
              <View key={index}>

                <TouchableOpacity 
                style={styles.activityList}
                ><Text style={styles.title}>{item.title}
                 </Text>
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
