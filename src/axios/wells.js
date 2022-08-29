import http from './index.js';
export function getwellsList_API() {
  return http.apisGet('/wells');
}
export function getWellCharts_API(path) {
  return http.apisGet(`/prod/${path}`);
}
