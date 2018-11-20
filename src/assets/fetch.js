import axios from 'axios'
//import cookie from '@/utils/cookie'
import {getCookie} from '@/assets/util'
const fetch = axios.create({
  // baseURL: 'http://39.104.140.40/ppp', 

//baseURL: 'http://192.168.3.88:8080/ppp' ,// api的base_url
  baseURL:'http://localhost:8080/ppp',
  //baseURL:'https://pengpengpiao.com/ppp',
  responseType: 'json',
  //withCredentials: true,
  //contentType:'json',
  timeout: 300000 // 请求超时时间``
})

// request拦截器
fetch.interceptors.request.use(config => {
  /*if (process.env.NODE_ENV === 'production') {
    if (cookie.isLogged()) {
      config.headers['exp-authorization'] = cookie.getBiteLoginToken()
    }
  }
  return config*/
  config.headers['Authorization'] = getCookie("Too")
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

export function httpGet(conf){
  conf['method'] = 'get'
    return fetch(conf)
}

export function httpPost(conf){
  conf['method'] ='post'
  return fetch(conf)
}



