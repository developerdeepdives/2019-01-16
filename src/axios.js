import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.interceptors.request.use(config => {
  config.headers.authorization = "let_me_in";
  return config;
})

instance.interceptors.response.use(response => {
  return response;
}, err => {
  return Promise.reject(err);
})

export default instance;