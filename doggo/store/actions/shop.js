import Toast from "react-native-toast-message";
import { apiCall } from "../../services/api";

const API = "https://api.doggoapp.ge";

export const fetchCategories = (setCategories) => {
  return apiCall("GET", `${API}/api/categories`)
    .then((res) => {
      setCategories(res.categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchProducts = (setProducts) => {
  return apiCall("GET", `${API}/api/products`)
    .then((res) => {
      setProducts(res.products.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const createOrder = (setLoading, order, callback) => {
  return apiCall("POST", `${API}/api/products/order`, order)
    .then((res) => {
      setLoading(false);
      callback();
    })
    .catch((err) => {
      setLoading(false);
      Toast.show({
        text2: "Order creation failed",
        type: "error",
        position: "top",
        visibilityTime: 1500,
        autoHide: true,
        topOffset: 50,
      });
    });
};
