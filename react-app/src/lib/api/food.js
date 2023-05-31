import axios from "axios";

export const getDetailData = (drink_id) => {
  return axios.get(`/detail/${drink_id}`);
};

export const getMyPageData = (userId) => {
  return axios.post("/mySelected", { userId });
};

export const getFoodsData = (selectedFoodCate) => {
  return axios.post("/food", { selectedFoodCate });
};

export const insertWishList = (restaurantName, drink, selectedFoodCate, avgPrice, userId, storeLocation, feature, deleteId, foodImg, wish) => {
  axios.post("/selection", { restaurantName, drink, selectedFoodCate, avgPrice, userId, storeLocation, feature, deleteId, foodImg, wish });
};

export const deleteWishList = (deleteId) => {
  axios.post("/delete", { deleteId });
};
