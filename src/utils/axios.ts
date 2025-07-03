import axios from 'axios';
import { API_BASE_URL } from '../constants/api';
import { LOGIN_URL } from '../constants/routes';
import { showErrorToast } from '../components/Toast';

type AxiosRequestConfig = Parameters<typeof axios.request>[0];

const Axios = axios.create({
  baseURL: API_BASE_URL,
});

Axios.interceptors.request.use((axiosConfig: AxiosRequestConfig) => {
  const token = localStorage.getItem('jwtToken');
  if (!axiosConfig.headers) {
    axiosConfig.headers = {};
  }
  if (!axiosConfig.headers['Content-Type']) {
    axiosConfig.headers['Content-Type'] = 'application/json';
  }
  axiosConfig.headers.Authorization = token ? `Bearer ${token}` : undefined;
  return axiosConfig;
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response && error?.response?.status === 401) {
      showErrorToast("Invalid user, Please re-login")
      setTimeout(() => {
        localStorage.clear();
        window.location.href = LOGIN_URL;
      }, 1000)
    }
    return Promise.reject(error);
  }
);

export default Axios;