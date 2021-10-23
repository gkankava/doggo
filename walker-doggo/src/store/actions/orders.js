import Toast from "react-native-toast-message";
import { apiCall } from "../../services/api";
import { setData, removeData } from "../../handlers/localStorage";

const API = "https://api.doggoapp.ge";

export const fetchOrder = (id, callback, as = false, prev) => {
  return apiCall("GET", `${API}/api/walk-orders/${id}`)
    .then((res) => {
      if (!as) {
        callback(res.order);
      } else {
        console.log("fetched order");
        let newArr = [];
        newArr = prev;
        newArr.push(res.order);
        callback(newArr);
      }
    })
    .catch((err) => {
      console.log("ERR:?? fetchOrder:");
    });
};

export const fetchInitiatedOrders = (orders, setOrders, setLoading) => {
  setLoading(true);
  return apiCall("GET", `${API}/api/walk-orders/initiated`)
    .then((res) => {
      setOrders(res.walk_orders);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const assignOrder = (
  orderId,
  walker_id,
  callback,
  asapOrders,
  setAsapOrders
) => {
  return apiCall("POST", `${API}/api/walk-orders/${orderId}/assign-to-walker`, {
    walker_id,
  })
    .then((res) => {
      setData("ACTIVE_ORDER", res.order.id.toString());
      callback(res.order);
      setAsapOrders(asapOrders.filter((i) => i.id != res.order.id));
    })
    .catch((err) => console.log("error at assign-order:", err));
};

export const fetchOrders = (
  id,
  orders,
  callback,
  setLoading = (bool) => {}
) => {
  return new Promise(() => {
    return apiCall("GET", `${API}/api/walkers/${id}/orders`)
      .then((res) => {
        callback(res.walker.orders);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  });
};

export const filterOrders = (orders) => {
  let asap = null;
  let dateArray = [];
  // console.log(orders);
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].service_type === 0 && order_status === 0) {
      asap = orders[i];
    } else if (orders[i].service_type === 1) {
      let month = dateString.months[orders[i].scheduled_time.getMonth()];
      let weekDay = dateString.weekDays[orders[i].scheduled_time.getDay()];
      let date = orders[i].scheduled_time.getDate();
      let dateTitle = "";
      if (Math.abs(Date.now() - orders[i].scheduled_time) / 36e5 < 10) {
        dateTitle = "UPCOMING";
      } else {
        dateTitle = `${weekDay} ${date} ${month}`;
      }
      if (!dateArray.includes(dateTitle)) {
        dateArray.push(dateTitle);
      }
    }
  }
  let DATA = dateArray.map((i) => ({
    title: i,
    data: [],
  }));
  for (let i = 0; i < orders.length; i++) {
    let month = dateString.months[orders[i].scheduled_time.getMonth()];
    let weekDay = dateString.weekDays[orders[i].scheduled_time.getDay()];
    let date = orders[i].scheduled_time.getDate();
    let dateTitle = "";
    if (Math.abs(Date.now() - orders[i].scheduled_time) / 36e5 < 10) {
      dateTitle = "UPCOMING";
    } else {
      dateTitle = `${weekDay} ${date} ${month}`;
    }
    DATA.map((item) => {
      if (item.title === dateTitle) {
        item.data.push(orders[i]);
      }
    });
  }
  return DATA;
};

export const startOrder = (id, setActiveOrder, setLoading) => {
  setLoading(true);
  return apiCall("POST", `${API}/api/walk-orders/${id}/start`)
    .then((res) => {
      console.log(res.message);
      setActiveOrder(res.order);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};

export const updateOrderLocations = (id, setActiveOrder, setLoading, geo) => {
  setLoading(true);
  return apiCall("GET", `${API}/api/walk-orders/${id}/locations`, {
    latitude: geo.lat,
    longitude: geo.lon,
    action_type: 1,
  })
    .then((res) => {
      console.log(res);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};

export const completeOrder = (id, setActiveOrder, setLoading) => {
  setLoading(true);
  return apiCall("GET", `${API}/api/walk-orders/${id}/complete`)
    .then((res) => {
      console.log(res);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};

export const dummy = [
  {
    id: 0,
    scheduled_time: new Date(2021, 7, 2),
    service_type: 1,
    img: require("../../../assets/images/dog.png"),
    name: "Jorj",
    address: "სულხან ცინცაძის 58",
    comment: "კორპუსი C / სართული 2 / ბინა 58",
    time: "12:00",
  },
  {
    id: 2,
    scheduled_time: new Date(2021, 7, 10),
    service_type: 1,
    img: require("../../../assets/images/dog.png"),
    name: "Jorj",
    address: "სულხან ცინცაძის 58",
    comment: "კორპუსი C / სართული 2 / ბინა 58",
    time: "12:00",
  },
  {
    id: 3,
    scheduled_time: new Date(2021, 7, 12),
    service_type: 1,
    img: require("../../../assets/images/dog.png"),
    name: "Jorj",
    address: "სულხან ცინცაძის 58",
    comment: "კორპუსი C / სართული 2 / ბინა 58",
    time: "12:00",
  },
  {
    id: 4,
    scheduled_time: new Date(2021, 7, 12),
    service_type: 1,
    img: require("../../../assets/images/dog.png"),
    name: "Jorj",
    address: "სულხან ცინცაძის 58",
    comment: "კორპუსი C / სართული 2 / ბინა 58",
    time: "12:00",
  },
  {
    id: 5,
    scheduled_time: new Date(2021, 7, 13),
    service_type: 1,
    img: require("../../../assets/images/dog.png"),
    name: "Jorj",
    address: "სულხან ცინცაძის 58",
    comment: "კორპუსი C / სართული 2 / ბინა 58",
    time: "12:00",
  },
  {
    id: 6,
    scheduled_time: new Date(2021, 7, 14),
    service_type: 1,
    img: require("../../../assets/images/dog.png"),
    name: "Jorj",
    address: "სულხან ცინცაძის 58",
    comment: "კორპუსი C / სართული 2 / ბინა 58",
    time: "12:00",
  },
  {
    id: 6,
    scheduled_time: new Date(2021, 7, 14),
    service_type: 1,
    img: require("../../../assets/images/dog.png"),
    name: "Jorj",
    address: "სულხან ცინცაძის 58",
    comment: "კორპუსი C / სართული 2 / ბინა 58",
    time: "12:00",
  },
  {
    id: 6,
    scheduled_time: new Date(2021, 7, 14),
    service_type: 1,
    img: require("../../../assets/images/dog.png"),
    name: "Jorj",
    address: "სულხან ცინცაძის 58",
    comment: "კორპუსი C / სართული 2 / ბინა 58",
    time: "12:00",
  },
  {
    id: 6,
    scheduled_time: new Date(2021, 7, 14),
    service_type: 1,
    img: require("../../../assets/images/dog.png"),
    name: "Jorj",
    address: "სულხან ცინცაძის 58",
    comment: "კორპუსი C / სართული 2 / ბინა 58",
    time: "12:00",
  },
  {
    id: 6,
    scheduled_time: new Date(2021, 7, 15),
    service_type: 1,
    img: require("../../../assets/images/dog.png"),
    name: "Jorj",
    address: "სულხან ცინცაძის 58",
    comment: "კორპუსი C / სართული 2 / ბინა 58",
    time: "12:00",
  },
];

const dateString = {
  weekDays: [
    "კვირა",
    "ორშაბათი",
    "სამშაბათი",
    "ოთხშაბათი",
    "ხუთშაბათი",
    "პარასკევი",
    "შაბათი",
  ],
  months: [
    "იანვარი",
    "თებერვალი",
    "მარტი",
    "აპრილი",
    "მაისი",
    "ივნისი",
    "ივლისი",
    "აგვისტო",
    "სექტემბერი",
    "ოქტომბერი",
    "ნოემბერი",
    "დეკემბერი",
  ],
};
