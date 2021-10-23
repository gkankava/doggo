import { apiCall } from "../../services/api";

const API = "https://api.doggoapp.ge";

export const fetchBreeds = (setBreeds) => {
  return apiCall("GET", `${API}/api/breeds`)
    .then((res) => {
      setBreeds(res.breeds);
    })
    .catch((err) => {
      console.log(err);
    });
};
