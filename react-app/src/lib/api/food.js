import axios from "axios";

export const getDetailData = (drink_id) => {
  return axios.get(`/detail/${drink_id}`);
};

export const getMyPageData = () => {
  return axios.post("/mySelected");
};

export const getFoodsData = (selectedFoodCate) => {
  return axios.post("/food", { foodCategory: selectedFoodCate });
};

export const updateFoodWish = (name, wishValue) => {
  axios.post("/wish", { restaurantName: name, newWish: wishValue });
};
