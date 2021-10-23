import { apiCall } from "./api";

const API = "https://api.doggoapp.ge";

export const setPushNotificationToken = (id, token) => {
  return new Promise(() => {
    return apiCall(
      "PATCH",
      `${API}/api/walkers/${id}/update-push-notification-token`,
      { token }
    )
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        err && console.log("set push not token: ", err);
      });
  });
};

export const sendNotification = (notification) => {
  return new Promise(() => {
    return apiCall("POST", `https://exp.host/--/api/v2/push/send`, notification)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
