import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import * as Linking from "expo-linking";

import { languageProvider } from "../../store/language";
import { pmc } from "./content/payments";

import { userProvider } from "../../store/auth";
import { userDataProvider } from "../../store/userData";
import {
  addCard,
  finishProccessing,
  updateDefaultCard,
} from "../../store/actions/cards";

import CardItem from "./CardItem";

const PaymentInfo = (props) => {
  const { language } = languageProvider();
  const ln = pmc[language];

  const [def, setDef] = useState(0);

  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [payId, setPayId] = useState(null);
  const [isResult, setIsResult] = useState(null);

  const { currentUser } = userProvider();
  const { cards, setCards } = userDataProvider();

  useEffect(() => {
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].is_default) {
        setDef(cards[i].id);
      }
    }
    setPaymentUrl(null);
    setPayId(null);
    setIsResult(null);

    return () => {
      setPaymentUrl(null);
      setPayId(null);
      setIsResult(null);
    };
  }, []);

  //get url

  const fetchUrl = () => {
    setLoading(true);
    addCard(
      currentUser.user.id,
      Constants.linkingUri,
      setPaymentUrl,
      setPayId,
      setLoading
    );
  };

  // END

  // open browser

  const handleLinking = async (paymentUrl) => {
    let result = await WebBrowser.openAuthSessionAsync(
      paymentUrl,
      Constants.linkingUri
    );
    setIsResult(result);
  };

  useEffect(() => {
    if (paymentUrl) {
      handleLinking(paymentUrl);
    }
  }, [paymentUrl]);

  // END

  // finish processing

  useEffect(() => {
    if (isResult) {
      if (isResult.type === "success") {
        finishProccessing(
          currentUser.user.id.toString(),
          payId,
          cards,
          setCards,
          setLoading
        );
      }
    }
  }, [isResult]);

  // END

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{ln.cards}</Text>
      <ScrollView
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {cards.map((item, key) => {
          return (
            <CardItem
              key={key}
              type={item.card_mask[0] === "4" ? "visa" : "mc"}
              number={item.card_mask.slice(-4)}
              def={def}
              id={item.id}
              userId={currentUser.user.id}
              setDef={setDef}
              updateDefaultCard={updateDefaultCard}
              cards={cards}
              setCards={setCards}
            />
          );
        })}
        <TouchableOpacity onPress={() => fetchUrl()}>
          {loading ? (
            <ActivityIndicator size="small" color="#3CBF77" />
          ) : (
            <Text style={styles.new}>{ln.new}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PaymentInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 12,
    fontWeight: "600",
    color: "#46596C",
    marginBottom: 20,
  },
  new: {
    textAlign: "center",
    color: "#43BE79",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 40,
  },
});
