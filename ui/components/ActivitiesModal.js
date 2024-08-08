import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import Divder from "./Divder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const ActivitiesModal = (props) => {
  const { modalVisible, setModalVisible, activity, setActivity } = props;

  const [activities, setActivities] = useState([]);
  const [dataSend, setDataSend] = useState({
    date: new Date(),
  });
  const [loading, setLoading] = useState(false);

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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
        >
          <View
            style={{
              paddingVertical: 50,
              paddingHorizontal: 30,
              minWidth: "90%",
              height: "60%",
              elevation: 5,
              borderRadius: 15,
              backgroundColor: "#E1E1E1",
            }}
          >
            {loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color={"black"} />
              </View>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: 35,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 40,
                  }}
                >
                  {activity.display_name}
                </Text>

                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 15,
                    // elevation: 5,
                  }}
                >
                  <View>
                    <SelectDate setDataSend={setDataSend} dataSend={dataSend} />
                  </View>

                  <Divder color="grey" height={0.5} />

                  {activity.slug === "E" || activity.slug === "M" ? (
                    <DropDownComponent
                      datas={activity.subtypes}
                      setDataSend={setDataSend}
                      dataSend={dataSend}
                    />
                  ) : null}

                  {activity.slug === "PA" ? (
                    <TextComp setDataSend={setDataSend} dataSend={dataSend} />
                  ) : null}

                  <TimeComp
                    dropdownData={activity.subtypes}
                    dataSend={dataSend}
                    setDataSend={setDataSend}
                  />
                </View>

                {/* buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setModalVisible(false);
                      setDataSend({
                        date: new Date(),
                      });
                    }}
                  >
                    <Text>cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      console.log(dataSend, "this is the data need to be send");
                      postactivites(
                        dataSend,
                        setLoading,
                        activity.id,
                        setModalVisible
                      );

                      setDataSend({
                        date: new Date(),
                      });
                    }}
                  >
                    <Text>Save</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ActivitiesModal;

const TimeComp = (props) => {
  const { dropdownData, dataSend, setDataSend } = props;
  const [showPicker, setShowPicker] = useState(false);
  const [time, setTime] = useState("00:00");

  return (
    <>
      <View
        style={{
          marginBottom: 15,
        }}
      >
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
};

const SelectTime = () => {};

/***
 *
 *
 * @params
 *
 *
 */

const DropDownComponent = (props) => {
  const { datas, styles, dataSend, setDataSend } = props;
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <>
      <View style={{ padding: 4, marginVertical: 10 }}>
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
              activity_sub_type_id: item.id,
            });
            console.log(item, "this is cool"); // Consider removing this in production
          }}
        />
      </View>
      <Divder height={0.75} color={"grey"} />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E1E1E1",
    elevation: 4,
    padding: 8,
    borderRadius: 6,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
});

const excStyle = StyleSheet.create({
  time: {
    width: "auto",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 6,
  },
  timeText: {
    backgroundColor: "#EEEEEE",
    padding: 7,
    borderRadius: 4,

    fontSize: 15,
    marginVertical: 10,
  },
  dropDown: {
    marginVertical: 10,
  },
  selectTime: {
    fontSize: 15,
    marginVertical: 10,
  },
});

const SelectDate = (props) => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const { dataSend, setDataSend } = props;
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 15 }}>Select Date:</Text>
        <TouchableOpacity
          onPress={() => setShowStartDatePicker(true)}
          style={{
            backgroundColor: "#EEEEEE",
            borderRadius: 3,
            alignSelf: "flex-end",
            padding: 7,
          }}
        >
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>
      </View>

      {showStartDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={(event, val) => {
            console.log(val, "thuasbdhsb");
            setShowStartDatePicker(false);
            setDate(val);

            console.log("sdjnsjd");
            if (event.type === "set") {
              setDataSend({ ...dataSend, date: val });
            }
          }}
        />
      )}
    </>
  );
};

const TextComp = (props) => {
  const { setDataSend, dataSend } = props;

  return (
    <>
      <TextInput
        placeholder="Add title"
        style={{ paddingVertical: 7 }}
        // value={text}
        onChangeText={(text) => {
          setDataSend({
            ...dataSend,
            text: text,
          });
        }}
      />
      <Divder height={0.75} color={"grey"} />
    </>
  );
};

async function postactivites(dataSend, setLoading, id, setModalVisible) {
  console.log(dataSend);
  try {
    const obj = {
      ...dataSend,
      activity_type_id: id,
    };
    const token = await AsyncStorage.getItem("token");
    setLoading(true);
    const res = await fetch(
      `${process.env.BACKEND_URI}/api/activities/activity_log`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(obj),
      }
    );

    console.log(obj);
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      Toast.show({
        type: "success",
        text1: "Activity set successfully",
      });
      setLoading(false);
      setModalVisible(false);
      return;
    } else {
      Toast.show({
        type: "error",
        text1: data.message,
      });
      setLoading(false);
      setModalVisible(false);
      return;
    }
  } catch (error) {
    Toast.show({
      type: "success",
      text1: error.message,
    });
    setLoading(false);
    setModalVisible(false);
    console.log(error);
  }
}
