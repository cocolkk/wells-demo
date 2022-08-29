import axios from 'axios';
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';

// console.log('eee_', env);
let http = axios.create({
  baseURL: '',
  timeout: 7000,
});
// console.log('http.baseURL==>', http.baseURL);

// 封装axios的get请求
http.get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// 封装axios的apisGet请求
http.apisGet = (url, params) => {
  url = '/api' + url;
  // console.log('url-->', url);
  return http.get(url, params);
};
export default http;
