import React, { useState, createRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  useWindowDimensions,
} from "react-native";
import {
  Location,
  Calendar,
  Bag,
  Chat,
  ChevronDown,
} from "react-native-iconly";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

import AddressContent from "./AddressContent";
import PaymentContent from "./PaymentContent";
import Comment from "./Comment";

import { languageProvider } from "../../store/language";
import { oc } from "./content/order";

import { shopProvider } from "../../store/products";
import { userDataProvider } from "../../store/userData";

import { createOrder } from "../../store/actions/shop";

import BtnFill from "../shared/buttons/BtnFill";

const ItemContainer = ({ title, count, price }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 15,
      }}
    >
      <Bag set="bold" primaryColor="#3CBF77" size={24} />
      <Text
        numberOfLines={1}
        style={{
          color: "#46596C",
          fontWeight: "400",
          fontSize: 16,
          marginLeft: 18,
          maxWidth: "60%",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: "#46596C",
          fontWeight: "400",
          fontSize: 16,
          marginLeft: 18,
        }}
      >
        x{count}
      </Text>
      <Text
        style={{
          marginLeft: "auto",
          color: "#46596C",
          fontWeight: "400",
          fontSize: 16,
        }}
      >
        {price}₾
      </Text>
    </View>
  );
};

const TranscriptContainer = ({ title, price, disc }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <Text style={{ fontSize: 16, color: "#46596C" }}>{title}</Text>
      <Text
        style={{
          fontSize: 17,
          fontWeight: "700",
          color: disc ? "#FF7D4A" : "#46596C",
        }}
      >
        {price}
      </Text>
    </View>
  );
};

const OrderDetails = ({ navigation }) => {
  const { language } = languageProvider();
  const ln = oc[language];

  const { products, order, setOrder, initialOrder } = shopProvider();
  const { addresses, cards } = userDataProvider();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [address, setAddress] = useState();
  const [card, setCard] = useState();
  const [comment, setComment] = useState("");

  const [vals, setVals] = useState({
    prod: 0,
    del: 3.2,
    dis: 0,
  });

  const [loading, setLoading] = useState(false);

  let renderList = () => {
    let arr = [];
    order.products.map((p, k) => {
      products.map((i, k) => {
        if (p.product_id === i.id) {
          arr.push({ ...p, name: i.name, price: i.price });
        }
      });
    });
    return arr.map((i, k) => (
      <ItemContainer key={k} title={i.name} count={i.qty} price={i.price} />
    ));
  };

  // ------ bs && order

  const [bsActive, setBsActive] = useState({ status: false, comp: null });

  const bs = createRef();
  const { height } = useWindowDimensions();
  const fall = new Animated.Value(1);

  React.useEffect(() => {
    if (bsActive.status === true) {
      bs.current.snapTo(1);
    } else bs.current.snapTo(0);
  }, [bsActive]);

  useEffect(() => {
    if (addresses.length > 0) {
      setAddress(addresses[0]);
    }
    if (cards.length > 0) {
      setCard(cards[0]);
    }
    let sum = 0;
    order.products.map((i, k) => {
      products.map((p, k) => {
        if (p.id === i.product_id) {
          sum = sum + p.price * i.qty;
        }
      });
    });
    setVals({ ...vals, prod: sum });
  }, []);

  useEffect(() => {
    setOrder({ ...order, delivery_address: JSON.stringify(address) });
  }, [address]);

  useEffect(() => {
    card && setOrder({ ...order, card_id: card.id });
  }, [card]);

  // useEffect(() => {
  //   setOrder({ ...order, comment });
  // }, [comment]);

  useEffect(() => {
    let sum = 0;
    order.products.map((i, k) => {
      products.map((p, k) => {
        if (p.id === i.product_id) {
          sum = sum + p.price * i.qty;
        }
      });
    });

    setOrder({ ...order, has_discount: isEnabled });
    if (isEnabled) {
      setVals({ ...vals, dis: 1, prod: sum });
    } else setVals({ ...vals, dis: 0, prod: sum });
  }, [isEnabled]);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View style={styles.bannerContainer}>
          <Image
            resizeMode="contain"
            style={styles.banner}
            source={require("../../assets/icons/zoomart.png")}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{ln.general}</Text>
          <TouchableOpacity
            style={styles.generalDetContainer}
            onPress={() =>
              setBsActive({ status: !bsActive.status, comp: "address" })
            }
          >
            <Location set="bold" primaryColor="#3CBF77" size={24} />
            <View style={{ marginLeft: 20 }}>
              {address ? (
                <>
                  <Text
                    style={{
                      color: "#46596C",
                      fontSize: 16,
                      fontWeight: "500",
                      marginBottom: 8,
                    }}
                  >
                    {address.name}
                  </Text>
                  <Text
                    style={{
                      color: "#46596C",
                      fontSize: 14,
                      fontWeight: "400",
                    }}
                  >
                    {address?.comment || "..."}
                  </Text>
                </>
              ) : (
                <Text
                  style={{ color: "#46596C", fontSize: 14, fontWeight: "400" }}
                >
                  Add new
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <View style={[styles.generalDetContainer, styles.bord]}>
            <Calendar set="bold" primaryColor="#3CBF77" size={24} />
            <View style={{ marginLeft: 20 }}>
              <Text
                style={{
                  color: "#46596C",
                  fontSize: 16,
                  fontWeight: "500",
                  marginBottom: 8,
                }}
              >
                {ln.sched}
              </Text>
              <Text
                style={{ color: "#46596C", fontSize: 14, fontWeight: "400" }}
              >
                5 მარტი, 25 მარტი
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{ln.selecteditems}</Text>
          {renderList()}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              marginTop: 15,
            }}
            onPress={() =>
              setBsActive({ status: !bsActive.status, comp: "comment" })
            }
          >
            <Chat set="bold" primaryColor="#3CBF77" size={24} />
            <View style={{ marginLeft: 18 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: "#46596C" }}
              >
                {ln.comment}
              </Text>
              <Text
                numberOfLines={2}
                style={{ maxWidth: "90%", color: "#A2ACB5", marginTop: 5 }}
              >
                {ln.comPlaceholder}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{ln.pay}</Text>
          <TouchableOpacity
            style={styles.paySelect}
            onPress={() =>
              setBsActive({ status: !bsActive.status, comp: "payment" })
            }
          >
            {card ? (
              <>
                <Image
                  source={
                    card.card_mask[0] === "4"
                      ? require("../../assets/icons/visa.png")
                      : require("../../assets/icons/mc.png")
                  }
                  style={{ marginRight: 10 }}
                />
                <Text style={{ marginRight: 10, color: "#46596C" }}>
                  **** **** ****
                </Text>
                <Text style={{ color: "#46596C" }}>
                  {card?.card_mask.slice(-4)}
                </Text>
              </>
            ) : (
              <Text>Add New</Text>
            )}
            <ChevronDown
              set="light"
              primaryColor="#200E32"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.sectionContainer,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <Text style={{ color: "#FF7D4A", fontWeight: "700", fontSize: 16 }}>
            DOGGO {ln.discount}
          </Text>
          <Switch
            trackColor={{ false: "#F8F8F9", true: "#43BE79" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#F8F8F9"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.botContainer}>
          <TranscriptContainer title={ln.prodtotal} price={vals.prod} />
          <TranscriptContainer title={ln.delivery} price={vals.del} />
          {isEnabled && (
            <TranscriptContainer
              title={ln.disc}
              price={("-", vals.dis)}
              disc={true}
            />
          )}
          <TranscriptContainer
            title={ln.total}
            price={parseFloat(vals.prod + vals.del - vals.dis).toFixed(2)}
          />
        </View>
        <BtnFill
          disabled={loading}
          title={ln.btn}
          callback={() => {
            setLoading(true);
            createOrder(setLoading, order, () => {
              navigation.navigate("OrderConfirm");
            });
          }}
        />
      </ScrollView>
      <BottomSheet
        ref={bs}
        snapPoints={[
          0,
          height * 0.4,
          bsActive.comp === "comment" ? height - 130 : height * 0.4,
        ]}
        initialSnap={0}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledInnerScrolling={true}
        enabledContentTapInteraction={false}
        style
        borderRadius={20}
        onCloseEnd={() => setBsActive({ status: false, comp: null })}
        renderContent={() => (
          <BsContent
            bsActive={bsActive}
            setBsAcxtive={setBsActive}
            addresses={addresses}
            setAddress={setAddress}
            bs={bs}
            cards={cards}
            setCard={setCard}
            comment={comment}
            setComment={setComment}
          />
        )}
      />
    </>
  );
};

export default OrderDetails;

const BsContent = ({
  bsActive,
  addresses,
  setAddress,
  bs,
  cards,
  setCard,
  comment,
  setComment,
}) => {
  const { language } = languageProvider();
  return (
    <View
      style={{
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 20,
        paddingVertical: 30,
        paddingBottom: 20,
        minHeight: "100%",
      }}
    >
      {bsActive.comp === "address" ? (
        <AddressContent
          language={language}
          addresses={addresses}
          setAddress={setAddress}
          bs={bs}
        />
      ) : bsActive.comp === "payment" ? (
        <PaymentContent
          language={language}
          cards={cards}
          setCard={setCard}
          bs={bs}
        />
      ) : (
        <Comment
          comment={comment}
          language={language}
          bs={bs}
          setComment={setComment}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
  },
  bannerContainer: {
    backgroundColor: "#F4F4F4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    paddingVertical: 20,
    marginBottom: 44,
  },
  banner: { width: 262 },
  sectionContainer: { marginBottom: 44 },
  sectionTitle: {
    color: "#A2ACB5",
    fontWeight: "600",
  },
  generalDetContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 15,
  },
  bord: {
    borderWidth: 1,
    borderColor: "#D9F2E4",
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  paySelect: {
    borderRadius: 18,
    backgroundColor: "#F8F8F9",
    height: 75,
    width: "100%",
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  botContainer: {
    borderTopColor: "#D9F2E4",
    borderTopWidth: 1,
    paddingVertical: 25,
  },
});
