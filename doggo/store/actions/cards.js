import Toast from "react-native-toast-message";
import { apiCall } from "../../services/api";

const API = "https://api.doggoapp.ge";

export const addCard = (id, returnUri, setPayUrl, setPayId, setLoading) => {
  return apiCall("POST", `${API}/api/customers/${id}/process-card`, {
    return_url: returnUri,
  })
    .then((res) => {
      setPayUrl(res.payment_url);
      setPayId(res.pay_id);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};

export const finishProccessing = (id, payId, cards, callback, setLoading) => {
  setLoading(true);
  return apiCall("POST", `${API}/api/customers/${id}/add-card`, {
    pay_id: payId,
  })
    .then((res) => {
      Toast.show({
        text2: "Card added successfully",
        type: "success",
        position: "top",
        visibilityTime: 1500,
        autoHide: true,
        topOffset: 50,
      });
      callback([...cards, res.card]);
      setLoading(false);
    })
    .catch((err) => {
      Toast.show({
        text2: "Card adding failed",
        type: "error",
        position: "top",
        visibilityTime: 1500,
        autoHide: true,
        topOffset: 50,
      });
      setLoading(false);
    });
};

export const updateDefaultCard = (userId, cardId, cards, setCards) => {
  return new Promise(() => {
    return apiCall(
      "PATCH",
      `${API}/api/customers/${userId}/cards/${cardId}/set-as-default`
    )
      .then((res) => {
        let newArr = [];
        for (let i = 0; i < cards.length; i++) {
          if (cards[i].id === cardId) {
            newArr[i] = res.card;
          } else {
            newArr[i] = cards[i];
          }
        }
        setCards(newArr);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const removeCard = (userId, cardId, cards, setCards, setLoading) => {
  return new Promise(() => {
    return apiCall(
      "DELETE",
      `${API}/api/customers/${userId}/cards/${cardId}/delete`
    )
      .then((res) => {
        let updatedList = cards.filter((card) => card.id !== cardId);
        setCards(updatedList);
        Toast.show({
          text2: "Card deleted successfully",
          type: "success",
          position: "top",
          visibilityTime: 1500,
          autoHide: true,
          topOffset: 50,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          text2: "Card deleting failed",
          type: "error",
          position: "top",
          visibilityTime: 1500,
          autoHide: true,
          topOffset: 50,
        });
        setLoading(false);
      });
  });
};
