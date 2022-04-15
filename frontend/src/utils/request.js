/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';
import {
  StatusCodes,
} from 'http-status-codes';
import store, {
  logout,
} from 'state/store';

const customAxiosInstance = axios.create();

customAxiosInstance.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // eslint-disable-next-line implicit-arrow-linebreak
    ({
      ...response,
      data: camelCaseKeys(response.data, { deep: true }),
    }),
  (error) => {
    // force logout user if we get unauthorized code
    if (error.statusCode === StatusCodes.UNAUTHORIZED) {
      store.dispatch(logout());
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    Promise.reject(error);
  }
  ,
);

export default customAxiosInstance;
