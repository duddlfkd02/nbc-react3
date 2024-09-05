import axios from "axios";

const api = axios.create({
  // 내가 만든 instance
  baseURL: "http://localhost:4000",
  // timeout: 1, // 1ms
});

api.interceptors.request.use((config) => {
  console.log("인터셉트 요청 성공!");

  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("응답을 받았어요! (정상)");
    return response;
  },
  (error) => {
    console.log("인터셉트 응답을 받지 못했습니다", error);
    return Promise.reject(error);
  }
);

export default api;
