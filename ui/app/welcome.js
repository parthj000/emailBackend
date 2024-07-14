import { Link, router, useRouter,useRouteParams } from "expo-router";
import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image,ImageBackground } from "react-native";



export default function WelcomePage() {
  const route = useRouter();
  


  return(
    <>
  <View style={{backgroundColor:"#ECECEC"}}>

        <ImageBackground style={styles.bgimage} source={require("../assets/welcome-bg.png")}></ImageBackground>
        <View style={styles.first}>
        <Text style={styles.Welcome}>Welcome <Text style={{color:"black", fontWeight:"bold"}}>back,</Text></Text>
        <Text style={styles.username}>Nitish !</Text>
        <TextInput maxLength={25} style={styles.usernameGoal} placeholder="set a goal for today">Work for next 5hour</TextInput>
        
        </View>

        <View style={styles.second}>

          
          <TouchableOpacity style={styles.Actvitiy} onPress={() => route.push('/activities')} >
          
            <Image source={require("../assets/activities.png")}></Image>
          <Text>Actvitiy</Text>   
              
          </TouchableOpacity>
          

          <TouchableOpacity style={styles.Calender} onPress={() => route.push('/calendar')}>
          <Image source={require("../assets/calendar.png")}></Image>
          <Text >Calender</Text>          
          </TouchableOpacity>

          <TouchableOpacity style={styles.Resources} onPress={() => route.push('/resources')}>
          <Image source={require("../assets/meditation.png")}></Image>
          <Text >Resources</Text>
          
          </TouchableOpacity>

          <TouchableOpacity style={styles.Progress} onPress={() => route.push('/progress')}>
          <Image source={require("../assets/progress.png")}></Image>
          <Text >Progress</Text>
          </TouchableOpacity>

        </View>

    </View>
    </>
    

  );
  
  
}

const styles = StyleSheet.create({
  
  bgimage:{
    position: 'absolute',
    top:-210,
    left: 0,
    right: 0,
    bottom: 0,
    width: 500,
    height: 505,
    zIndex: -1,
  },
  first:{
    

    paddingLeft:40,
  },

  Welcome:{
    fontWeight:"bold",
    marginTop:"15%",
    fontSize:40,
    color:"white"

    

  },
  username:{
    color:"white",
    fontSize:25,
    fontWeight:"00",
  },

  usernameGoal:{
    marginTop:35,
    width:"83%",
    backgroundColor:"white",
    textAlign:"center",
    height:35,
    padding:5,
    borderRadius:25,
  },

  Goal:{
    marginTop:5,
    width:"83%",
    
    textAlign:"center",
    height:35,
    padding:5,
    borderRadius:25,
  },

  
  second:{
    
    
    paddingTop:60,
    alignItems:'center',
    flexDirection:"row",
    flexWrap:"wrap",
    gap:15,
    paddingLeft:40,
    paddingBottom:"100%"

    
    
  },
  

  Actvitiy:{
    overflow: 'hidden', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor:"white",
    width:"40%",
    height:150,
    borderRadius:15,
    alignItems:"center",
    justifyContent:"center",
  },

  Calender:{
    overflow: 'hidden', 
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    
    elevation: 5,
    backgroundColor:"white",
    width:"40%",
    height:150,
    borderRadius:15,
    alignItems:"center",
    justifyContent:"center",

  },

  Resources:{
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor:"white",
    width:"40%",
    height:150,
    borderRadius:15,
    alignItems:"center",
    justifyContent:"center",
  },

  Progress:{
    overflow: 'hidden', 
   shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor:"white",
    width:"40%",
    height:150,
    borderRadius:15,
    alignItems:"center",
    justifyContent:"center",

  }


  
});