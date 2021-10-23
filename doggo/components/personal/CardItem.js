import React, { createRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Delete } from "react-native-iconly";

import visa from "../../assets/icons/visa.png";
import mc from "../../assets/icons/mc.png";

import { removeCard } from "../../store/actions/cards";

const CardItem = ({
  type,
  number,
  def,
  id,
  setDef,
  updateDefaultCard,
  userId,
  cards,
  setCards,
}) => {
  const { height } = useWindowDimensions();

  const sw = createRef();

  const [isLoading, setIsLoading] = useState(false);

  const DelBtn = () => (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: 8 }} />
      <TouchableOpacity
        style={[styles.del, { height: height * 0.095 }]}
        onPress={() => {
          sw.current.close();
          setIsLoading(true);
          removeCard(userId, id, cards, setCards, setIsLoading);
        }}
      >
        <Delete set="bold" primaryColor="white" size={20} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable ref={sw} overshootRight={false} renderRightActions={DelBtn}>
      {isLoading ? (
        <View
          style={{
            align: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.container,
            {
              backgroundColor: def === id ? "#B5E5CA" : "#F8F8F9",
              height: height * 0.095,
            },
          ]}
          onPress={() => {
            setDef(id);
            updateDefaultCard(userId, id, cards, setCards);
          }}
        >
          <Image
            style={{ marginRight: 20 }}
            source={type === "visa" ? visa : mc}
          />
          <Text style={{ color: "#46596C", fontSize: 13 }}>
            **** **** **** {number}
          </Text>
          <View
            style={{
              backgroundColor: "white",
              height: 26,
              width: 26,
              borderRadius: 13,
              borderWidth: def === id ? 8 : 3,
              borderColor: "#3CBF77",
              marginLeft: "auto",
            }}
          />
        </TouchableOpacity>
      )}
    </Swipeable>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    paddingHorizontal: 34,
    paddingVertical: 25,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
  },
  del: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FA4242",
    borderRadius: 18,
    width: 65,
    paddingVertical: 25,
  },
});
