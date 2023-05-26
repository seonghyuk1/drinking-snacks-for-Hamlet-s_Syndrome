import axios from "axios";

export const getDetailData = (drink_id) => {
  return axios.get(`/detail/${drink_id}`);
};

export const getMyPageData = () => {
  return axios.post("/mySelected");
};

export const getFoodsData = (name) => {
  return axios.post("/food", { data: name });
};
