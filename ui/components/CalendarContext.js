import React, { createContext, useState } from "react";

const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {
  const [view, setView] = useState("month");
  const [modalVisible, setModalVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [month, setMonth] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [represent, setRepresent] = useState(new Date().toISOString());
  const [newDate, setNewDate] = useState(new Date());
  const [newEvents, setEvents] = useState([]);
  const [previousweek, setPreviousweek] = useState({});
  const [nextweek, setNextweek] = useState({});
  const [weekEvents, setWeekEvents] = useState([]);
  const [selectedValue, setSelectedValue] = useState("month");

  return (
    <CalendarContext.Provider
      value={{
        view,
        month,
        newEvents,
        previousweek,
        setPreviousweek,
        selectedValue,
        setSelectedValue,
        nextweek,
        setNextweek,
        weekEvents,
        setWeekEvents,
        setEvents,
        newDate,
        setNewDate,
        setMonth,
        setView,
        modalVisible,
        setModalVisible,
        currentDate,
        setCurrentDate,
        headerVisible,
        setHeaderVisible,
        represent,
        setRepresent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarContext, CalendarProvider };
