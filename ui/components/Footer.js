import React, { useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { CalendarContext } from "./CalendarContext";
import { Divider } from "react-native-paper";

const Footer = () => {
  const { setModalVisible } = useContext(CalendarContext);

  return (
    <>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add Event</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  addButton: {
    marginVertical: 7,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,

    elevation: 10,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Footer;
