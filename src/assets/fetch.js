import axios from 'axios'
//import cookie from '@/utils/cookie'
import {getCookie} from '@/assets/util'
const fetch = axios.create({
  // baseURL: 'http://39.104.140.40/ppp', 

//baseURL: 'http://192.168.3.88:8080/ppp' ,// api的base_url
    baseURL:'http://localhost:8080/ppp',
  //baseURL:'http://pengpengpiao.com/ppp',
  //baseURL:'http://39.104.104.150:443/ppp',
  responseType: 'json',
  //withCredentials: true,
  contentType:'json',
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
   //alert("interceptors request")
  config.headers['Authorization'] = getCookie("Too")
  config.headers['UUID'] = getCookie('Iud')
  return config
}, error => {
 alert("request error")
  console.log("request error")
  console.log(error.response)
  return Promise.reject(error)
})


fetch.interceptors.response.use(response =>{
  //alert("interceptors response ")
  return response;
},error=>{
  //alert("interceptors response")
  console.log("response error ////////////////")
  console.log(error)
  console.log(error.response)
  if ( error && error.response.data && error.response.data.status) {
    switch(error.response.data.status){
      case 602:
      alert("602")
        break;
      case 702:
      alert("702")
        break;
      case 802:
      alert("802")
      alert("登录失效，请重新登录")
      default:
        break;
    }
  }
  return Promise.reject(error.response)
})

export function httpGet(conf){
  conf['method'] = 'get'
    return fetch(conf)
}

export function httpPost(conf){
  conf['method'] ='post'
  return fetch(conf)
}

export function myPost(url,parambody,headers){
  return fetch({
    url:url,
    data:parambody,
    method:'post'
  })
}



