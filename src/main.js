import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FastClick from 'fastclick';
import axios from 'axios'
import VueAxios from 'vue-axios'
import "amfe-flexible/index.js"
import { vueBaberrage} from 'vue-baberrage'
import {Button,Field,Toast,Dialog,Overlay} from 'vant';
[vueBaberrage,Button,Field,Toast,Dialog,Overlay].forEach(e => {
  Vue.use(e)
});
Vue.use(VueAxios,axios);
Vue.config.productionTip = false
FastClick.prototype.focus = function (targetElement) {
  var length;

  var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
  var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;  
    //兼容处理:在iOS7中，有一些元素（如date、datetime、month等）在setSelectionRange会出现TypeError    
    //这是因为这些元素并没有selectionStart和selectionEnd的整型数字属性，所以一旦引用就会报错，因此排除这些属性才使用setSelectionRange方法
  if ( deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') { 
    length = targetElement.value.length; 
    targetElement.setSelectionRange(length, length);//修复bug ios 11.3不弹出键盘，这里加上聚焦代码，让其强制聚焦弹出键盘    
    targetElement.focus(); 
  } else { 
    targetElement.focus(); 
  }
}
FastClick.attach(document.body);
//解决IOS中input失焦后页面不回退问题
var u = navigator.userAgent;
    var flag;
    var myFunction;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS) {
        document.body.addEventListener('focusin', () => {  //软键盘弹起事件
            flag = true;
            clearTimeout(myFunction);
        })
        document.body.addEventListener('focusout', () => { //软键盘关闭事件
            flag = false;
            if (!flag) {
                myFunction = setTimeout(function () {
                    window.scrollTo({ bottom: 0, left: 0, behavior: "smooth" })//重点  =======当键盘收起的时候让页面回到原始位置(这里的bottom可以根据你们个人的需求改变，并不一定要回到页面底部)
 
                }, 200);
            } else {
                return false
            }
        })
    }
axios.defaults.baseURL = 'http://192.168.0.109:9001/school-service';
axios.interceptors.response.use(function(response){
  let res = response.data;
  if(res.code ===10200){
    return res.data;
  }else{
    return Promise.reject(res.data);
  }
},(error)=>{
  let res = error.response;
  return Promise.reject(error);
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
