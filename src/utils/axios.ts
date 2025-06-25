import axios from 'axios';
import { API_BASE_URL } from '../constants/api';
import { LOGIN_URL } from '../constants/routes';

const Axios = axios.create({
  baseURL: API_BASE_URL,
});

Axios.interceptors.request.use((axiosConfig) => {
  const token = localStorage.getItem('jwtToken');
  // if (!axiosConfig.headers['Content-Type']) {
  //   axiosConfig.headers['Content-Type'] = 'application/json';
  // }
  // axiosConfig.headers.Authorization = token ? `Bearer ${token}` : undefined;
  return axiosConfig;
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response && error?.response?.status === 401) {
      localStorage.clear();
      window.location.href = LOGIN_URL;
    }
    return Promise.reject(error);
  }
);

export default Axios;