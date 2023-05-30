import axios from "axios";

export const getDetailData = (drink_id) => {
  return axios.get(`/detail/${drink_id}`);
};

export const getMyPageData = (userId) => {
  return axios.post("/mySelected", { userId: userId });
};

export const getFoodsData = (selectedFoodCate) => {
  return axios.post("/food", { foodCategory: selectedFoodCate });
};

export const insertWishList = (name, drink, selectedFoodCate, avgPrice, id, storeLocation, feature, deleteId, foodImg, wish) => {
  axios.post("/selection", { restaurantName: name, drink: drink, foodCategory: selectedFoodCate, avgPrice: avgPrice, userId: id, storeLocation: storeLocation, feature: feature, deleteId: deleteId, foodImg: foodImg, wish: wish });
};

export const deleteWishList = (deleteId) => {
  axios.post("/delete", { deleteId: deleteId });
};
