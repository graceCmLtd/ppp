import axios from 'axios'
//import cookie from '@/utils/cookie'
import {getCookie} from '@/assets/util'
const fetch = axios.create({
  //baseURL: 'http://39.104.140.40/ppp', // api的base_url
  baseURL:'http://localhost:8080/ppp',
  //baseURL:'https://pengpengpiao.com/ppp',
  responseType: 'json',
  //withCredentials: true,
  //contentType:'json',
  timeout: 300000 // 请求超时时间``
})

// request拦截器
axios.interceptors.request.use(config => {
  /*if (process.env.NODE_ENV === 'production') {
    if (cookie.isLogged()) {
      config.headers['exp-authorization'] = cookie.getBiteLoginToken()
    }
  }
  return config*/
   //alert("interceptors request")
  config.headers['Authorization'] = getCookie("Too")
  config.headers['UUID'] = getCookie('Iud')
  return config
}, error => {
 
  console.log("request error")
  console.log(error.response)
  return Promise.reject(error)
})


axios.interceptors.response.use(response =>{
  
  return response;
},error=>{
  //alert("interceptors response")
  console.log("response error ////////////////")
  console.log(error.response)
  if ( error && error.response) {
    switch(error.response.status){
      case 602:
      alert("602")
        break;
      case 702:
      alert("702")
        break;
      default:
        break;
    }
  }
  return Promise.reject(error)
})

export function httpGet(conf){
  conf['method'] = 'get'
    return fetch(conf)
}

export function httpPost(conf){
  conf['method'] ='post'
  return fetch(conf)
}



