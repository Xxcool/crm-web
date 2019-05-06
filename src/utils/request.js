/**
 * Created by lijinfeng on 2019/1/16.
 */
import axios from "axios"
import {Message} from "element-ui"
import store from "../store"
import qs from 'qs'

const request = axios.create({
  timeout: 600000
})

// 请求
request.interceptors.request.use(
  config => {
    if (config.type === "form") {
      config.method = "post"
      config.data = qs.stringify(config.data)
      config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8"
    }
    return config
  },
  error => {
    console.log("请求错误")
    console.log(error)
    Promise.reject(error)
  }
)

// 返回
request.interceptors.response.use(
  response => {
    if (response.data.hasOwnProperty('status')) {
      const res = response.data;
      if (res.status === 1001) {
        Message({
          message: "登录过期，请重新登录",
          type: "error",
          duration: 3 * 1000
        });
        setTimeout(() => {
          store.dispatch("logout")
        }, 3 * 1000);
      }
      if (res.status !== 0) {
        Message({
          message: res.msg,
          type: "error",
          duration: 3 * 1000
        });
        return Promise.reject(response.data);
      } else {
        return response.data;
      }
    } else {
      if (response.data.type && response.data.type === 'application/json') {
        let fr = new FileReader();
        fr.onload = function (evt) {
          let res = JSON.parse(evt.target.result);
          Message({
            message: res.msg,
            type: "error",
            duration: 3 * 1000
          });
        };
        fr.readAsText(response.data);
      } else {
        return response;
      }
    }
  },
  error => {
    console.log("返回错误");
    Message({
      message: error.response.status,
      type: "error",
      duration: 3 * 1000
    });
    return Promise.reject(error.data);
  }
)

export default request
