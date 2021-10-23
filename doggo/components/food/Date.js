import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { languageProvider } from "../../store/language";
import { Calendar } from "react-native-calendars";

import SwitchComp from "./SwitchComp";
import BtnFill from "../shared/buttons/BtnFill";

import { shopProvider } from "../../store/products";

var INITIAL_DATE = new Date();

const DatePick = ({ navigation }) => {
  const { language } = languageProvider();
  const [selected, setSelected] = useState(0);

  const [selectedDate, setSelectedDate] = useState(INITIAL_DATE);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [currentSelector, setCurrentSelector] = useState(0);

  const { order, setOrder } = shopProvider();

  let formattedDate = `${INITIAL_DATE.getFullYear()}-${
    INITIAL_DATE.getMonth() > 0 && INITIAL_DATE.getMonth() < 10
      ? "0" + INITIAL_DATE.getMonth()
      : INITIAL_DATE.getMonth()
  }-${
    INITIAL_DATE.getDate() > 0 && INITIAL_DATE.getDate() < 10
      ? "0" + INITIAL_DATE.getDate()
      : INITIAL_DATE.getDate()
  }`;

  React.useEffect(() => {
    if (formattedDate) {
      setSelectedDate(formattedDate);
    }
  }, [formattedDate]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Text style={styles.title}>
        {language === "en" ? "Choose period" : "აირჩიე სიხშირე"}
      </Text>
      <SwitchComp selected={selected} setSelected={setSelected} />
      <Calendar
        hideArrows={true}
        hideExtraDays={true}
        disableMonthChange={true}
        onDayPress={(day) => {
          if (selected === 0) {
            setSelectedDate(day.dateString.slice(0, 10));
          }
          if (selected === 1) {
            if (currentSelector === 0) {
              setSelectedDate(day.dateString.slice(0, 10));
              setCurrentSelector(1);
            } else if (currentSelector === 1) {
              setSelectedDate2(day.dateString.slice(0, 10));
              setCurrentSelector(0);
            }
          }
        }}
        markingType="custom"
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: "#E1F4DF",
            customStyles: {
              text: {
                color: "#43BE79",
                fontWeight: "bold",
              },
            },
          },
          [selectedDate2]: {
            selected: selected === 0 ? false : true,
            disableTouchEvent: selected === 0 ? false : true,
            selectedColor: "#E1F4DF",
            customStyles: {
              text: {
                color: selected === 0 ? "black" : "#43BE79",
                fontWeight: selected === 0 ? "300" : "bold",
              },
            },
          },
        }}
      />
      <BtnFill
        title={language === "en" ? "Select" : "დასრულება"}
        st={{ marginTop: 30 }}
        callback={() => {
          if (selectedDate) {
            navigation.navigate("Order");
          }
          if (selected === 1) {
            setOrder({
              ...order,
              delivery_date_one: selectedDate,
              delivery_date_two: selectedDate2,
            });
          } else if (selected === 0) {
            setOrder({
              ...order,
              delivery_date_one: selectedDate,
              delivery_date_two: null,
            });
          }
        }}
      />
    </ScrollView>
  );
};

export default DatePick;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#46596C",
  },
});
