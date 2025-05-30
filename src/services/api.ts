import axios from "axios";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    const token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZlNjVjY2I4ZWFkMGJhZWY1ZmQzNjE5NWQ2NTI4YTA1NGZiYjc2ZjMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWxjb3pvbmUtZTIxYjAiLCJhdWQiOiJhbGNvem9uZS1lMjFiMCIsImF1dGhfdGltZSI6MTc0ODU3NDU1NSwidXNlcl9pZCI6Im9oMW50VXlrUmpXV2xZU290aGxhQVZ0QWZHNTMiLCJzdWIiOiJvaDFudFV5a1JqV1dsWVNvdGhsYUFWdEFmRzUzIiwiaWF0IjoxNzQ4NTc0NTU1LCJleHAiOjE3NDg1NzgxNTUsImVtYWlsIjoibWF0YW1lQG1hdGFtZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibWF0YW1lQG1hdGFtZS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.jxc1BMediB_HNDGCZfPseh_dE5bE98ZxA_tB9K-fn6HEp4TLvoF9UhnRBExxeti6UowsLOlJ4_aPgt2yDnVUI5ng5pI_YIusBdvk8T3Q1Uen3RPmsOMEIvUfkiTW-Ng7kjZ4aN4RARqFzheQyu7soDgdwqZSPwLPCc4G0LjjXhz9G85ryriGCA-ktMDjl7dtknxyMiYpp958y7jEhZmgR-5RvrvxcfmQuJrCljwvOs-qC_MdiGzJKtOFIqk488f94FAXB0kPdGK40OdiknKFRnG8IvimNjQtrl5ZQHztI05XPAcChl_TzEj8Pg6FyY4xnFFHuVqiNppkuP4O5XDrXg"; // TODO remove this hardcoded token string
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
