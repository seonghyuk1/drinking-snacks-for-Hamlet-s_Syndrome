import axios from "axios";

export const getDetailData = (id) => {
  return axios.get(`/detail/${id}`);
};

export const getFoodData = (id) => {
  return axios.get(`/food/${id}`);
};

export const getMyPageData = (ID) => {
  return axios.post("/mypage", { data: ID });
};
