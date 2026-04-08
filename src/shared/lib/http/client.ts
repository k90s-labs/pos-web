import axios from "axios";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 공통 에러 핸들링/토큰 붙이기(나중에 확장)
httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    // 여기서 401 처리 / 토스트 처리 가능
    return Promise.reject(err);
  }
);