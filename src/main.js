import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fastclick from 'fastclick';
import axios from 'axios'
import VueAxios from 'vue-axios'
import "amfe-flexible/index.js"
import { vueBaberrage} from 'vue-baberrage'
import {Button,Field,Toast,Dialog } from 'vant';
[vueBaberrage,Button,Field,Toast,Dialog].forEach(e => {
  Vue.use(e)
});
Vue.use(VueAxios,axios);
// Vue.config.productionTip = false
// fastclick.attach(document.body);
// axios.defaults.baseURL = '/api';
// axios.interceptors.response.use(function(response){
//   let res = response.data;
//   if(res.status == 0){
//     return res.data;
//   }else if(res.status == 10){
//     return Promise.reject(res);
//   }else{
//     Message.warning(res.msg);
//     return Promise.reject(res);
//   }
// },(error)=>{
//   let res = error.response;
//   this.$toast.fail('失败文案');
//   return Promise.reject(error);
// });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
