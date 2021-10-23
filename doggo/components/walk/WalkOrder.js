import React, { useEffect, useState, createRef } from "react";
import {
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import BS from "./BS";
import BtnFill from "../shared/buttons/BtnFill";

import { wc } from "./content/order";
import { languageProvider } from "../../store/language";
import { walkServicesProvider } from "../../store/walkServices";
import { walkOrderProvider, initialOrder } from "../../store/walkOrder";
import { userProvider } from "../../store/auth";
import { userDataProvider } from "../../store/userData";
import { initOrder } from "../../store/actions/walkServices";

import DogSelector from "./DogSelector";
import ServiceCard from "./ServiceCard";
import Details from "./Details";
import PaymentOption from "./PaymentOption";
import Discount from "./Discount";

const dd = 0.005;

const WalkOrder = ({ ...props }) => {
  const navigation = useNavigation();
  const { currentUser } = userProvider();
  const { walkOrders, setWalkOrders } = userDataProvider();
  const { language } = languageProvider();
  const ln = wc[language];
  const { serviceType, selectedService } = props.route.params;
  const { walkServices } = walkServicesProvider();
  const [bsState, setBsState] = useState({ isActive: false, com: null });
  const bs = createRef();
  const fall = new Animated.Value(1);
  const { height } = useWindowDimensions();

  const { order, setOrder, setActiveOrder } = walkOrderProvider();

  const [itemList, setItemList] = useState({
    date: [],
    time: [],
  });

  // ---- order details local state ---- //
  const [selectedItem, setSelectedItem] = useState([0, 0]);
  const [ss, setSs] = useState(null);
  const [selectedDog, setSelectedDog] = useState(null);
  const [selectedAddr, setSelectedAddr] = useState(null);
  const [comment, setComment] = useState("");
  const [selectedWalker, setSelectedWalker] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [date, setDate] = useState(null);
  const [val, setVal] = useState(0);
  // ------------------------------------ //

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    selectedService &&
      setSs(walkServices.find((i) => i.id === selectedService));
  }, []);

  useEffect(() => {
    isEnabled && setVal((val) => val - dd);
    !isEnabled && setVal((val) => val + dd);
  }, [isEnabled]);

  useEffect(() => {
    if (bsState.isActive === true) {
      bs.current.snapTo(2);
    } else bs.current.snapTo(0);
    if (bsState.isActive === true && bsState.com === "comment") {
      bs.current.snapTo(1);
    }
  }, [bsState]);

  useEffect(() => {
    ss && setVal(ss.price);
  }, [ss]);

  useEffect(() => {
    setOrder({
      ...order,
      address: selectedAddr?.name,
      dog_id: selectedDog?.id,
      card_id: selectedCard?.id,
      service_type: serviceType === 0 ? "asap" : "scheduled",
      customer_id: currentUser.user.id,
      walk_service_id: selectedService,
      scheduled_time: date,
    });
  }, [selectedDog, selectedAddr, selectedCard, selectedItem, date]);

  useEffect(() => {
    if (selectedItem && itemList.time.length > 0 && itemList.date.length > 0) {
      let d = new Date(itemList.date[selectedItem[0]]);
      console.log(d.getFullYear());
      let dd = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        itemList.time[selectedItem[1]].slice(0, 2)
      );
      setDate(dd.toISOString());
    }
  }, [selectedItem]);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        bounces={false}
      >
        <DogSelector
          bsState={bsState}
          setBsState={setBsState}
          selectedDog={selectedDog}
          setSelectedDog={setSelectedDog}
        />
        <Text style={styles.sh}>{ln.hs}</Text>
        {ss && <ServiceCard item={ss} st={true} />}
        <Text style={styles.sh}>{ln.hd}</Text>

        <Details
          serviceType={serviceType}
          bsState={bsState}
          setBsState={setBsState}
          selectedAddress={selectedAddr}
          setSelectedAddress={setSelectedAddr}
          comment={comment}
          setComment={setComment}
          selectedWalker={selectedWalker}
          itemList={itemList}
          setItemList={setItemList}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <Text style={styles.sh}>{ln.ph}</Text>
        <PaymentOption
          card={selectedCard}
          setCard={setSelectedCard}
          bsState={bsState}
          setBsState={setBsState}
        />
        <Discount
          isEnabled={isEnabled}
          toggleSwitch={toggleSwitch}
          discount={ln.discount}
        />
        {/* <Transcript />  */}
        <View
          style={{ width: "100%", height: 0.5, backgroundColor: "#42B8FA" }}
        />
        {isEnabled && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#46596C", fontSize: 16, fontWeight: "500" }}>
              {ln.discount}
            </Text>
            <Text style={{ color: "#FF7D4A", fontSize: 16, fontWeight: "500" }}>
              -{dd.toFixed(3)}₾
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#46596C", fontSize: 16, fontWeight: "500" }}>
            {ln.total}
          </Text>
          <Text style={{ color: "#3CBF77", fontSize: 22, fontWeight: "500" }}>
            {val.toFixed(3)}₾
          </Text>
        </View>
        <BtnFill
          title={ln.fin}
          st={{ marginTop: 20 }}
          callback={() => {
            initOrder(
              order,
              () => {
                setOrder(initialOrder);
                navigation.navigate("WalkProgress", {
                  selectedAddress: selectedAddr,
                });
              },
              walkOrders,
              setWalkOrders,
              selectedAddr,
              setActiveOrder
            );
          }}
        />
      </ScrollView>
      <BottomSheet
        ref={bs}
        snapPoints={[
          0,
          height * 0.3,
          bsState.com === "comment" || bsState.com === "choose"
            ? height - 130
            : height * 0.3,
        ]}
        initialSnap={0}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledInnerScrolling={true}
        enabledContentTapInteraction={false}
        borderRadius={20}
        backgroundColor={"red"}
        onCloseEnd={() => setBsState({ status: false, comp: null })}
        renderContent={() => (
          <BS
            bs={bs}
            bsState={bsState}
            setBsState={setBsState}
            language={language}
            comment={comment}
            setComment={setComment}
            selectedDog={selectedDog}
            setSelectedDog={setSelectedDog}
            selectedAddress={selectedAddr}
            setSelectedAddress={setSelectedAddr}
            selectedWalker={selectedWalker}
            setSelectedWalker={setSelectedWalker}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        )}
      />
    </>
  );
};

export default WalkOrder;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  sh: {
    fontSize: 14,
    fontWeight: "600",
    color: "#46596C",
    marginBottom: 25,
  },
});
