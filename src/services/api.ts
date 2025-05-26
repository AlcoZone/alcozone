import axios from "axios";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    const token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZlNjVjY2I4ZWFkMGJhZWY1ZmQzNjE5NWQ2NTI4YTA1NGZiYjc2ZjMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWxjb3pvbmUtZTIxYjAiLCJhdWQiOiJhbGNvem9uZS1lMjFiMCIsImF1dGhfdGltZSI6MTc0ODI5ODkzNCwidXNlcl9pZCI6Im9oMW50VXlrUmpXV2xZU290aGxhQVZ0QWZHNTMiLCJzdWIiOiJvaDFudFV5a1JqV1dsWVNvdGhsYUFWdEFmRzUzIiwiaWF0IjoxNzQ4Mjk4OTM0LCJleHAiOjE3NDgzMDI1MzQsImVtYWlsIjoibWF0YW1lQG1hdGFtZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibWF0YW1lQG1hdGFtZS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Jov_1m8JVqvB7Re1k0HrJWKhmS4EGjWxgi-TIwMilJnuzwZckz7lIcASjB2MXBVvFKGNpnfGRnYDejGRUxOI_oJd_tc-uYJYPg1M14SePoWyIUScIDWWT3TeAkCP1e41SOZBdQDM1V4yz3LM6cmCnSDT7W9RqhRwapRXMEbo0hXRK-tLSlbhxYCfLJOiKDStqLT-GoTYaL7Wum8B9UbDRZrPLfoWU5kFpE4CEeycI1HzYlOGk1dKTDaizoAWGlUcsVFvQFzK5oZ2EqWVj393Zs5Jfyg_k6V7kZLbX1F8x9DlLuBfJGluDioiyZiIVWu40D6xAebxk_BYV2mOh94bvg";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
