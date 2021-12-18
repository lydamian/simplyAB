/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';

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
  (error) =>
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    Promise.reject(error)
  ,
);

export default customAxiosInstance;
