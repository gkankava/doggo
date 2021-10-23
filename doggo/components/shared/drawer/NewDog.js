import React, { useState, useRef, useEffect, createRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";

import { ndc } from "./content/newDog";
import { languageProvider } from "../../../store/language";
import { userDataProvider } from "../../../store/userData";
import { userProvider } from "../../../store/auth";
import { addDog, updateDog } from "../../../store/actions/dogs";

import BtnFill from "../buttons/BtnFill";

import { Image2, ChevronDown, Calendar } from "react-native-iconly";

const NewDog = ({ navigation, isSignUp, route }) => {
  const { language } = languageProvider();
  const ln = ndc[language];

  const [isEdit, setIsEdit] = useState(false);
  const [dog, setDog] = useState(null);

  const { currentUser } = userProvider();
  const { dogs, setDogs } = userDataProvider();

  useEffect(() => {
    if (route.params) {
      setIsEdit(route.params.dogId);
      let selected = dogs.filter((dog) => dog.id === route.params.dogId)[0];
      setDog(selected);
      setName(selected.name);
      setSelectedBreed(selected.breed_id.toString());
      setSex(selected.sex.toString());
      let s = selected.sterilisation_castration === false ? 0 : 1;
      setSt(s);
      setSize(selected.size);
      let str = selected.birth_date;
      let toDate = new Date(str);
      setDate(toDate);
    }
  }, [route]);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("0");
  const [sex, setSex] = useState("0");
  const [st, setSt] = useState(null);
  const [date, setDate] = useState(new Date());
  const [size, setSize] = useState(0);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [changed, setChanged] = useState(false);

  const onChange = (event, selectedDate) => {
    setChanged(true);
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleSubmit = () => {
    setIsLoading(true);

    let formattedDate = `${date.getFullYear()}-${
      date.getMonth() > 0 && date.getMonth() < 10
        ? "0" + date.getMonth()
        : date.getMonth()
    }-${
      date.getDate() > 0 && date.getDate() < 10
        ? "0" + date.getDate()
        : date.getDate()
    }`;
    let dogData = {
      name,
      customer_id: currentUser.user.id.toString(),
      breed_id: selectedBreed.toString(),
      birth_date: formattedDate,
      sex: sex.toString(),
      size,
      sterilisation_castration: st === 0 ? false : true,
    };
    !isEdit
      ? addDog(dogData, setIsLoading, setDogs, dogs)
      : updateDog(dog.id, dogData, setIsLoading, setDogs, dogs);
    !isSignUp ? navigation.goBack() : navigation.navigate("Terms");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      {!isEdit && <Text style={styles.p}>{ln.p}</Text>}
      {isEdit && (
        <Image
          style={{
            width: "100%",
            resizeMode: "contain",
            alignSelf: "center",
            borderRadius: 18,
            borderWidth: 1,
            borderColor: "rgba(0,0,0,.1)",
            marginBottom: 20,
          }}
          source={require("../../../assets/dummy/dogprof.jpeg")}
        />
      )}

      <TouchableOpacity style={styles.upBtn}>
        <Image2 set="bold" primaryColor="#3CBF77" size={20} />
        <Text style={styles.upBtnTxt}>{ln.upload}</Text>
      </TouchableOpacity>
      <TextInput
        style={[styles.defContainer, { marginBottom: 18 }]}
        onChangeText={(data) => setName(data)}
        value={name}
        placeholder={ln.name}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <RNPickerSelect
        items={[
          { label: "test breed 1", value: "1" },
          { label: "test breed 2", value: "2" },
          { label: "test breed 3", value: "3" },
        ]}
        onValueChange={(value) => setSelectedBreed(value)}
        placeholder={{
          label: ln.breed,
          value: null,
          color: "#9EA0A4",
        }}
      >
        <TextInput
          editable={false}
          style={styles.defContainer}
          value={selectedBreed || ln.breed}
        />
        <ChevronDown
          style={{ position: "absolute", right: 24, top: sh * 0.0345 - 12 }}
          set="light"
          primaryColor="#70667B"
          size={24}
        />
      </RNPickerSelect>
      <Text style={[styles.title, { marginTop: 40 }]}>{ln.sex}</Text>
      <View style={styles.selectorContainer}>
        <TouchableOpacity
          style={[
            styles.selectorBtn,
            { backgroundColor: sex === "1" ? "#3CBF77" : "#F6FBF6" },
          ]}
          onPress={() => setSex("1")}
        >
          <Text
            style={[
              styles.selectorTxt,
              { color: sex === "1" ? "white" : "#46596C" },
            ]}
          >
            {language === "en" ? "Female" : "მდედრი"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.selectorBtn,
            { backgroundColor: sex === "2" ? "#3CBF77" : "#F6FBF6" },
          ]}
          onPress={() => setSex("2")}
        >
          <Text
            style={[
              styles.selectorTxt,
              { color: sex === "2" ? "white" : "#46596C" },
            ]}
          >
            {language === "en" ? "Male" : "მამრი"}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{ln.st}</Text>
      <View style={styles.selectorContainer}>
        <TouchableOpacity
          style={[
            styles.selectorBtn,
            { backgroundColor: st === 1 ? "#3CBF77" : "#F6FBF6" },
          ]}
          onPress={() => setSt(1)}
        >
          <Text
            style={[
              styles.selectorTxt,
              { color: st === 1 ? "white" : "#46596C" },
            ]}
          >
            {language === "en" ? "Yes" : "კი"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.selectorBtn,
            { backgroundColor: st === 0 ? "#3CBF77" : "#F6FBF6" },
          ]}
          onPress={() => setSt(0)}
        >
          <Text
            style={[
              styles.selectorTxt,
              { color: st === 0 ? "white" : "#46596C" },
            ]}
          >
            {language === "en" ? "No" : "არა"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.defContainer, { marginBottom: 20 }]}
        onPress={() => setShowDatePicker(!showDatePicker)}
      >
        <Calendar set={"bold"} size={24} color={"#3CBF77"} />
        <Text
          style={{
            color: "#B5C8DB",
            fontSize: 14,
            fontWeight: "600",
            marginLeft: 10,
          }}
        >
          {changed || isEdit
            ? date.toLocaleString("en-us", { dateStyle: "medium" })
            : ln.date}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          display="spinner"
          onChange={onChange}
          style={{
            width: "100%",
            backgroundColor: "white",
            zIndex: 100,
          }}
        />
      )}
      <RNPickerSelect
        items={[
          { label: "xs", value: "xs" },
          { label: "s", value: "s" },
          { label: "m", value: "m" },
          { label: "l", value: "l" },
          { label: "xl", value: "xl" },
          { label: "xxl", value: "xxl" },
        ]}
        onValueChange={(value) => setSize(value)}
        placeholder={{
          label: ln.size,
          value: null,
          color: "#9EA0A4",
        }}
        style={{ marginTop: 10 }}
      >
        <TextInput
          editable={false}
          style={[styles.defContainer, { marginBottom: 40 }]}
          value={size || ln.size}
        />
        <ChevronDown
          style={{ position: "absolute", right: 24, top: sh * 0.0345 - 12 }}
          set="light"
          primaryColor="#70667B"
          size={24}
        />
      </RNPickerSelect>
      {isSignUp && (
        <TouchableOpacity
          onPress={() => navigation.navigate("Terms")}
          style={{ alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#46596C" }}>
            {ln.later}
          </Text>
        </TouchableOpacity>
      )}
      <BtnFill
        title={isEdit ? ln.save : ln.add}
        st={{ marginTop: 20 }}
        callback={handleSubmit}
        disabled={isLoading}
      />
    </ScrollView>
  );
};

export default NewDog;

const sh = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  p: {
    fontSize: 16,
    fontWeight: "600",
    color: "#46596C",
    marginBottom: 45,
  },
  upBtn: {
    width: "100%",
    backgroundColor: "#F6FBF6",
    borderRadius: 18,
    height: sh * 0.09,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 18,
    borderWidth: 2,
    borderColor: "rgba(67, 190, 121, 0.7)",
  },
  upBtnTxt: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3CBF77",
    marginLeft: 15,
  },
  defContainer: {
    flexDirection: "row",
    borderWidth: 0,
    borderRadius: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F6FBF6",
    minHeight: 45,
    height: sh * 0.069,
    position: "relative",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#46596C",
    marginBottom: 18,
  },
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 40,
  },

  selectorBtn: {
    height: sh * 0.069,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    marginRight: 10,
  },
  selectorTxt: {
    fontSize: 16,
    fontWeight: "500",
  },
});
