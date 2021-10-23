import React, { createRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Delete } from "react-native-iconly";
import { useNavigation } from "@react-navigation/native";

import { languageProvider } from "../../../store/language";
import { userDataProvider } from "../../../store/userData";
import { deleteDog } from "../../../store/actions/dogs";

const DogCard = ({ name, img, age, breed, route, id }) => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { language } = languageProvider();
  const { dogs, setDogs } = userDataProvider();

  const [isLoading, setIsLoading] = useState(false);

  const sw = createRef();

  const DelBtn = () => (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: 8 }} />
      <TouchableOpacity
        style={[styles.del, { height: height * 0.127 }]}
        onPress={() => {
          sw.current.close();
          deleteDog(id, setIsLoading, setDogs, dogs);
        }}
      >
        <Delete set="bold" primaryColor="white" size={20} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable ref={sw} overshootRight={false} renderRightActions={DelBtn}>
      <TouchableOpacity
        activeOpacity={0.95}
        style={[styles.container, { height: height * 0.127 }]}
        disabled={isLoading}
        onPress={() => navigation.navigate("EditDog", { dogId: id })}
      >
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
          <>
            <Image
              style={[
                styles.img,
                { height: height * 0.1, width: height * 0.1 },
              ]}
              //  source={{ uri: img }}
              source={img}
              resizeMode="cover"
            />
            <View style={styles.innerContainer}>
              <Text style={styles.name}>{name}</Text>
              <View style={styles.detContainer}>
                <Text style={styles.det}>
                  {age} {language === "en" ? "years" : "წლის"}
                </Text>
                <Text style={styles.det}>{breed}</Text>
              </View>
            </View>
          </>
        )}
      </TouchableOpacity>
    </Swipeable>
  );
};

export default DogCard;

const styles = StyleSheet.create({
  container: {
    padding: 14,
    width: "100%",
    backgroundColor: "#F8F8F9",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 18,
    marginBottom: 18,
  },
  img: {
    minHeight: 40,
    minWidth: 40,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "white",
  },
  innerContainer: {
    marginHorizontal: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 20,
    color: "#3CBF77",
    fontWeight: "600",
  },
  detContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  det: {
    fontSize: 14,
    fontWeight: "500",
    color: "#46596C",
    marginRight: 10,
  },
  del: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FA4242",
    borderRadius: 18,
    width: 85,
  },
});
