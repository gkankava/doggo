import Toast from "react-native-toast-message";
import { apiCall } from "../../services/api";
import { setTokenHeader } from "../../services/api";
import { setData } from "../../handlers/localStorage";

const API = "https://api.doggoapp.ge";

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export const signIn = (userData, callback, setSubmitting) => {
  return new Promise(() => {
    return apiCall("POST", `${API}/api/walkers/login`, userData)
      .then((res) => {
        setSubmitting(false);
        setData("jwtToken", res.token);
        setData("CURRENT_USER", res.user.id.toString());
        setAuthorizationToken(res.token);
        callback(true, res.user);
      })
      .catch((err) => {
        setSubmitting(false);
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

export const fetchUser = (token, callback, setLoading) => {
  return new Promise(() => {
    return apiCall("post", `${API}/api/users/me`, { token })
      .then((res) => {
        callback(true, res.customer);
        setData("CURRENT_USER", res.customer.id.toString());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  });
};

export const updateLocation = (id, location, callback) => {
  return new Promise(() => {
    return apiCall(
      "PATCH",
      `${API}/api/walkers/${id}/update-current-location`,
      location
    )
      .then((res) => {
        // console.log(
        //   `${new Date(Date.now()).toLocaleTimeString()}: ${location.latitude},${
        //     location.longitude
        //   } --TO--> ${id}`
        // );
        // console.log("updated");
        if (callback) {
          callback(location);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
