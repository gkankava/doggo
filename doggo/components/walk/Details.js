import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Location, Chat, TimeCircle, User } from "react-native-iconly";
import Picker from "@gregfrench/react-native-wheel-picker";
var PickerItem = Picker.Item;

import { languageProvider } from "../../store/language";
import { wc } from "./content/order";
import { userDataProvider } from "../../store/userData";

function getDates(startDate, endDate) {
  const dates = [];
  let currentDate = startDate;
  const addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  while (currentDate <= endDate) {
    dates.push(
      currentDate
        .toLocaleString()
        .slice(0, currentDate.toLocaleString().indexOf(","))
    );
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
}

const generateDateList = () => {
  let startDate = new Date();
  if (startDate.getHours() > 22) {
    startDate.setDate(startDate.getDate() + 1);
  }
  let endDate = new Date();
  endDate.setDate(startDate.getDate() + 7);
  const res = getDates(startDate, endDate);
  return res;
};

const generateTimeList = () => {
  let timeList = [];
  let endTime = 22;
  let startTime = new Date();
  if (startTime.getHours() >= 8) {
    startTime.setHours(startTime.getHours() + 1);
  } else {
    startTime.setHours(10);
  }
  for (let i = startTime.getHours(); i < endTime; i++) {
    timeList.push(i.toString() + " : 00");
  }
  return timeList;
};

const Details = ({
  serviceType,
  bsState,
  setBsState,
  selectedAddress,
  setSelectedAddress,
  comment,
  selectedWalker,
  selectedItem,
  setSelectedItem,
  itemList,
  setItemList,
}) => {
  const language = languageProvider((state) => state.language);
  const ln = wc[language];

  const { addresses } = userDataProvider();

  useEffect(() => {
    let dateList = generateDateList();
    let timeList = generateTimeList();
    setItemList({
      date: dateList,
      time: timeList,
    });
    if (addresses.length > 0) {
      setSelectedAddress(addresses[0]);
    }
  }, []);

  const [timePickerActive, setTimePickerActive] = useState();

  return (
    <View style={{ marginBottom: 20 }}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setBsState({ isActive: true, com: "addr" })}
      >
        <Location set="bold" primaryColor="#3CBF77" size={30} />
        <View style={styles.inner}>
          {selectedAddress ? (
            <>
              <Text style={styles.name} numberOfLines={1}>
                {selectedAddress?.name}
              </Text>
              <Text style={styles.det}>
                {selectedAddress?.comment?.length > 0
                  ? selectedAddress?.comment
                  : "..."}
              </Text>
            </>
          ) : (
            <Text style={styles.det}>{ln.addr}</Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={serviceType === 0 ? true : false}
        style={styles.container}
        onPress={() => setTimePickerActive(!timePickerActive)}
      >
        <TimeCircle set="bold" primaryColor="#3CBF77" size={28} />
        <View style={styles.inner}>
          <Text style={styles.name}>
            {serviceType === 0 ? ln.type0 : ln.type1}
          </Text>
        </View>
      </TouchableOpacity>
      {timePickerActive && (
        <View style={{ flexDirection: "row" }}>
          <Picker
            style={{ width: "50%", height: 180 }}
            selectedValue={selectedItem[0]}
            itemStyle={{ color: "#3CBF77", fontSize: 24 }}
            onValueChange={(index) => setSelectedItem([index, selectedItem[1]])}
          >
            {itemList.date.map((value, i) => (
              <PickerItem label={value} value={i} key={i} />
            ))}
          </Picker>
          <Picker
            style={{ width: "50%", height: 180, marginBottom: 20 }}
            selectedValue={selectedItem[1]}
            itemStyle={{ color: "#3CBF77", fontSize: 24 }}
            onValueChange={(index) => setSelectedItem([selectedItem[0], index])}
          >
            {itemList.time.map((value, i) => (
              <PickerItem label={value} value={i} key={i} />
            ))}
          </Picker>
        </View>
      )}
      {serviceType === 0 ? (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            setBsState({
              isActive: true,
              com: "comment",
            });
          }}
        >
          <Chat set="bold" primaryColor="#3CBF77" size={28} />
          <View style={styles.inner}>
            <Text style={styles.namec}>დაამატე კომენტარი</Text>
            <Text style={styles.detc} numberOfLines={2}>
              {comment.length > 0
                ? comment
                : "სპეციალური მოთხოვნები, ალერგიები და ა.შ"}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            setBsState({
              isActive: true,
              com: "choose",
            });
          }}
        >
          <User set="bold" primaryColor="#3CBF77" size={28} />
          <View style={styles.inner}>
            <Text style={styles.name} numberOfLines={1}>
              {selectedWalker ? selectedWalker.name : ln.cho}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  inner: {
    marginLeft: 15,
  },
  name: {
    color: "#46596C",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
    paddingRight: 20,
  },
  det: {
    color: "#46596C",
    fontSize: 14,
    fontWeight: "400",
  },
  namec: {
    color: "#46596C",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },
  detc: {
    color: "#A2ABB5",
    fontSize: 14,
    fontWeight: "400",
    maxWidth: "90%",
  },
});
