import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 공통 에러 핸들링/토큰 붙이기(나중에 확장)
http.interceptors.response.use(
  (res) => res,
  (err) => {
    // 여기서 401 처리 / 토스트 처리 가능
    return Promise.reject(err);
  }
);