import Toast from "react-native-toast-message";
import { apiCall } from "../../services/api";

const API = "https://api.doggoapp.ge";

export const addDog = (dogData, setLoading, callback, dogs) => {
  return apiCall("POST", `${API}/api/dogs`, dogData)
    .then((res) => {
      callback([...dogs, res.dog]);
      Toast.show({
        text2: "Dog added successfully",
        type: "success",
        position: "top",
        visibilityTime: 1500,
        autoHide: true,
        topOffset: 50,
      });
      setLoading(false);
    })
    .catch((err) => {
      Toast.show({
        text2: err || "Error adding dog",
        type: "error",
        position: "top",
        visibilityTime: 1500,
        autoHide: true,
        topOffset: 50,
      });
      setLoading(false);
    });
};
export const updateDog = (id, dogData, setLoading, callback, dogs) => {
  console.log(id, dogData);
  return apiCall("PUT", `${API}/api/dogs/${id}/update`, dogData)
    .then((res) => {
      let newArr = dogs.map((item, key) => {
        if (item.id === id) {
          item = res.dog;
        }
      });
      callback(newArr);
      Toast.show({
        text2: "Dog Updated successfully",
        type: "success",
        position: "top",
        visibilityTime: 1500,
        autoHide: true,
        topOffset: 50,
      });
      setLoading(false);
    })
    .catch((err) => {
      Toast.show({
        text2: err || "Error updating dog profile",
        type: "error",
        position: "top",
        visibilityTime: 1500,
        autoHide: true,
        topOffset: 50,
      });
      setLoading(false);
    });
};
export const deleteDog = (id, setLoading, callback, dogs) => {
  setLoading(true);
  return apiCall("DELETE", `${API}/api/dogs/${id}/delete`)
    .then((res) => {
      let updatedList = dogs.filter((dog) => dog.id !== res.dog.id);
      callback(updatedList);
      Toast.show({
        text2: "Dog deleted successfully",
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
        text2: err || "Error removing dog",
        type: "error",
        position: "top",
        visibilityTime: 1500,
        autoHide: true,
        topOffset: 50,
      });
      setLoading(false);
    });
};
