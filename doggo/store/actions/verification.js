import { apiCall } from "../../services/api";
import Toast from "react-native-toast-message";

const API = "https://api.doggoapp.ge";

export const getVerificationCode = (phone) => {
  return new Promise(() => {
    return apiCall("POST", `${API}/api/customers/verify-phone`, {
      number: phone,
    })
      .then((res) => {
        console.log("res:", res);
      })
      .catch((err) => {
        console.log("get err: ", err);
      });
  });
};

export const checkVerificationCode = (code, phone, callback) => {
  return new Promise(() => {
    return apiCall("POST", `${API}/api/customers/phone-verification/check`, {
      verification_code: code,
      number: phone,
    })
      .then((res) => {
        if (res.message === "phone is verified") {
          callback();
        } else {
          Toast.show({
            text2: "Incorrect verification code",
            type: "error",
            position: "top",
            visibilityTime: 1500,
            autoHide: true,
            topOffset: 50,
          });
        }
      })
      .catch((err) => {
        console.log("post err: ", err);
      });
  });
};
