import axios from 'axios'
import qs from 'qs'
import baseUrl from './Url'
import Vue from 'vue'

Vue.prototype.$ajax = axios    //全局注册，使用方法为:this.$ajax

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(config.url.indexOf("http://")==-1){ //如果请求的路径是全路径,那么就不走原本的baseUrl
      config.url = baseUrl.baseUrl + config.url;
    }
    config.data = qs.stringify(config.data); //对formdata进行转码
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {

    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });