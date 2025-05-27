import axios from "axios";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    const token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZlNjVjY2I4ZWFkMGJhZWY1ZmQzNjE5NWQ2NTI4YTA1NGZiYjc2ZjMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWxjb3pvbmUtZTIxYjAiLCJhdWQiOiJhbGNvem9uZS1lMjFiMCIsImF1dGhfdGltZSI6MTc0ODMwMjk1MCwidXNlcl9pZCI6Im9oMW50VXlrUmpXV2xZU290aGxhQVZ0QWZHNTMiLCJzdWIiOiJvaDFudFV5a1JqV1dsWVNvdGhsYUFWdEFmRzUzIiwiaWF0IjoxNzQ4MzAyOTUwLCJleHAiOjE3NDgzMDY1NTAsImVtYWlsIjoibWF0YW1lQG1hdGFtZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibWF0YW1lQG1hdGFtZS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Jh5Mnm329a3ppV1t5oBaIXdc7h89_8oh2jtru6-VvhnMW6PAdCPwofi9HqdxmeJ0g9ZWYYs7aF46kcKdJz7-YUhnB7CjCARTYxcW_GFlVXpVoCiMFRwKtU-1tEHPCtHjZ-E-tKZNx0xgk3Q88IIVEGi0qIyuBti5W4nzeOd-ORDLg_zQMYWxXDItVoFNkRaIoi2DsjtKDJyEBi0C-eXEFgbrlrY0z0fT2g4cYF6qmfFP0Z-_OZfVh-wsKH7FyQ3WiHQwkqE_hg8sadx4LSdZLGoYwk-3KynioX4IjRk9EaWxDhE4qMRlEDR9x6HzoU0dssFpzhnmI68eYUI-PFGngw"; // TODO remove this hardcoded token string
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
