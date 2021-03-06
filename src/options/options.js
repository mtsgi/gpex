import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';

Vue.use(ElementUI);

global.browser = require('webextension-polyfill');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});
