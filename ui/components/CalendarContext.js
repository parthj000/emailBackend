import React, { createContext, useState } from "react";

const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {
  const [view, setView] = useState("week");
  const [modalVisible, setModalVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);

  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <CalendarContext.Provider
      value={{
        view,
        setView,
        modalVisible,
        setModalVisible,
        currentDate,
        setCurrentDate,
        headerVisible,
        setHeaderVisible,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarContext, CalendarProvider };
