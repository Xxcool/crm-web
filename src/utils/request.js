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
    const res = response.data
    if (res.type === "application/octet-stream") {
      return response.data
    }
    if (res.status === 1001) {
      Message({
        message: "登录过期，请重新登录",
        type: "error",
        duration: 5 * 1000
      })
      setTimeout(() => {
        store.dispatch("logOut")
      }, 5 * 1000)
    }
    if (res.status !== 0) {
      Message({
        message: res.msg,
        type: "error",
        duration: 5 * 1000
      })
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  error => {
    console.log("返回错误")
    console.log(error)
    Message({
      message: error.msg,
      type: "error",
      duration: 5 * 1000
    })
    return Promise.reject(error.data)
  }
)

export default request
