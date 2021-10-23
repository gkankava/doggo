import haversine from "haversine";
import { apiCall } from "../../services/api";
import { removeData, setData } from "../../handlers/localStorage";

const API = "https://api.doggoapp.ge";

export const fetchWalkServices = (store, callback) => {
  return new Promise(() => {
    return apiCall("GET", `${API}/api/walk-services`)
      .then((res) => {
        const isUpdated =
          JSON.stringify(store) !== JSON.stringify(res.services);
        if (!isUpdated) {
          console.log("nothing to update");
          return;
        }
        callback(res.services);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const fetchWalkers = (callback) => {
  return new Promise(() => {
    return apiCall("GET", `${API}/api/walkers`)
      .then((res) => {
        callback(res.walkers);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const initOrder = (
  orderDetails,
  callback,
  walkOrders,
  setWalkOrders,
  selectedAddr,
  setActiveOrder
) => {
  return new Promise(() => {
    return apiCall("POST", `${API}/api/walk-orders/initiate`, {
      ...orderDetails,
      latitude: selectedAddr.latitude,
      longitude: selectedAddr.longitude,
    })
      .then((res) => {
        console.log("initOrder -> res.order.id", res.order.id);
        setData("active_order", res.order.id.toString()).then(() =>
          console.log("set async storage")
        );
        callback();
        setWalkOrders([...walkOrders, res.order]);
        fetchWalkOrderDetails(res.order.id, setActiveOrder);
        var oD = res;
        apiCall("GET", `${API}/api/walkers`)
          .then((res) => {
            let newArr = res.walkers.filter(
              (i) => i.location_latitude && i.location_longitude
            );
            let finArr = [];
            newArr.map((i) => {
              let h = haversine(
                {
                  latitude: selectedAddr.latitude,
                  longitude: selectedAddr.longitude,
                },
                {
                  latitude: i.location_latitude,
                  longitude: i.location_longitude,
                },
                { threshold: 10 }
              );
              h && finArr.push(i);
            });
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify([
              {
                to: ["ExponentPushToken[KKWtUvOBGhhS8IX01aonH-]"],
                sound: "default",
                title: "New Order",
                body: `${orderDetails.address}`,
                data: { ...oD, selectedAddr },
              },
            ]);

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            fetch("https://exp.host/--/api/v2/push/send", requestOptions)
              .then((response) => response.text())
              .then((result) => console.log(result))
              .catch((error) => console.log("error", error));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("init order err:", err);
      });
  });
};

export const signOrder = (
  orderId,
  walkerId,
  callback
  // walkOrders,
  // setWalkOrders
) => {
  return new Promise(() => {
    return apiCall(
      "POST",
      `${API}/walk-orders/${orderId}/assign-to-walker`,
      walkerId
    )
      .then((res) => {
        callback();
        setWalkOrders([...walkOrders, res.order]);
      })
      .catch((err) => {
        console.log("sign order err:", err);
      });
  });
};

export const fetchWalkOrderDetails = (orderId, callback) => {
  return new Promise(() => {
    return apiCall("GET", `${API}/api/walk-orders/${orderId}`)
      .then((res) => {
        callback(res);
        if (res.order.order_status === 3) {
          removeData("active_order");
          callback(false);
        }
      })
      .catch((err) => {
        console.log("fetch walk order det err:", err);
      });
  });
};
