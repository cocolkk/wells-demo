import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'; //此为组件主题样式，可修改dx.dark、dx.light、dx.darkmoon等，详情见官方API
createApp(App).use(router).mount('#app');
