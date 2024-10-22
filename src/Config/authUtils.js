// authUtils.js
import { jwtDecode } from 'jwt-decode';
import { store } from '../user/redux/store'; // Adjust path as needed
import { logout } from '../user/redux/Auth/Action';


export const checkTokenExpiration = () => {
  const token = localStorage.getItem('jwt');
  
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      if (decodedToken.exp < currentTime) {
        // Token has expired
        localStorage.removeItem('jwt');
        store.dispatch(logout());
        return false;
      }
      return true;
    } catch (error) {
      // Invalid token
      localStorage.removeItem('jwt');
      store.dispatch(logout());
      return false;
    }
  }
  return false;
};

// Axios interceptor to check token before each request
export const setupAuthInterceptor = (api) => {
  api.interceptors.request.use(
    (config) => {
      if (checkTokenExpiration()) {
        const token = localStorage.getItem('jwt');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('jwt');
        store.dispatch(logout());
      }
      return Promise.reject(error);
    }
  );
};