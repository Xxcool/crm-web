/**
 * Created by lijinfeng on 2019/1/16.
 */

import Cookies from "js-cookie"

const TokenKey = "oss_token"

export function cookie_getToken() {
  return Cookies.get(TokenKey)
}

export function cookie_setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function cookie_removeToken() {
  return Cookies.remove(TokenKey)
}
