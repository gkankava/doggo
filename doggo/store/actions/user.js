import Toast from "react-native-toast-message";
import { apiCall } from "../../services/api";
import { setTokenHeader } from "../../services/api";
import { setData } from "../../handlers/localStorage";

const API = "https://api.doggoapp.ge";

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export const signIn = (
  userData,
  callback,
  setSubmitting,
  setLoading,
  setDogs,
  setCards,
  setWalkOrders
) => {
  return new Promise(() => {
    return apiCall("POST", `${API}/api/customers/login`, userData)
      .then((res) => {
        setSubmitting(false);
        setData("jwtToken", res.token);
        setAuthorizationToken(res.token);
        callback(true, res.user);
        fetchUserData(
          res.user.id,
          setLoading,
          setDogs,
          setCards,
          setWalkOrders
        );
      })
      .catch((err) => {
        setSubmitting(false);
        setLoading(false);
        Toast.show({
          text2: "Incorrect Credentials, Try Again",
          type: "error",
          position: "top",
          visibilityTime: 1500,
          autoHide: true,
          topOffset: 50,
        });
      });
  });
};

export const signUp = (userData, callback, setSubmitting, setLoading) => {
  return new Promise(() => {
    return apiCall("post", `${API}/api/customers/register`, userData)
      .then((res) => {
        setData("jwtToken", res.token);
        setAuthorizationToken(res.token);
        callback(true, res.customer);
        setLoading(false);
      })
      .catch((err) => {
        setSubmitting(false);
        setLoading(false);
        console.log(err);
        Toast.show({
          text2: err,
          type: "error",
          position: "top",
          visibilityTime: 1500,
          autoHide: true,
          topOffset: 50,
        });
      });
  });
};

export const fetchUser = (
  token,
  callback,
  setLoading,
  setDogs,
  setCards,
  setAddresses,
  setWalkOrders
) => {
  return new Promise(() => {
    return apiCall("post", `${API}/api/users/me`, { token })
      .then((res) => {
        callback(true, res.customer);
        fetchUserData(
          res.customer.id,
          setLoading,
          setDogs,
          setCards,
          setAddresses,
          setWalkOrders
        );
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  });
};

const fetchUserData = (
  id,
  setLoading,
  setDogs,
  setCards,
  setAddresses,
  setWalkOrders
) => {
  return apiCall("GET", `${API}/api/customers/${id}`)
    .then((res) => {
      setDogs(res.customer.dogs);
      setCards(res.customer.cards);
      setAddresses(res.customer.addresses);
      setWalkOrders(res.customer.walk_orders);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      console.log("err");
      setLoading(false);
    });
};

export const updatePassword = (id, body, setLoading, callback) => {
  return apiCall("PATCH", `${API}/api/customers/${id}/update-password`, body)
    .then((res) => {
      if (res.error_message) {
        Toast.show({
          text2: "Incorrect password",
          type: "error",
          position: "top",
          visibilityTime: 1500,
          autoHide: true,
          topOffset: 50,
        });
      } else {
        Toast.show({
          text2: "Password updated successfully",
          type: "success",
          position: "top",
          visibilityTime: 1500,
          autoHide: true,
          topOffset: 50,
        });
      }
      callback();
      setLoading(false);
    })
    .catch((err) => {
      console.log("location update err: ", err);
      Toast.show({
        text2: "Incorrect password",
        type: "error",
        position: "top",
        visibilityTime: 1500,
        autoHide: true,
        topOffset: 50,
      });
      setLoading(false);
    });
};
