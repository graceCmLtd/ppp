import axios from 'axios'
//import cookie from '@/utils/cookie'
import {getCookie} from '@/assets/util'
const fetch = axios.create({
  //baseURL: 'http://39.104.140.40/ppp', // api的base_url
  baseURL:'http://localhost:8080/ppp',
  responseType: 'json',
  withCredentials: true,
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
  config.headers['Authorization'] = getCookie("Too")
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

export function getStatus(typeName) {
  return fetch({
    url: 'status/' + typeName,
    method: 'get'
  })
}

export function triggerManualOrder(data) {
  return fetch({
    url: 'manual/trigger',
    method: 'post',
    data: data
  })
}

export function getTestOrderServer() {
  return fetch({
    url: 'api/order-server-config/',
    method: 'get'
  })
}

export function updateTestOrderServer(item) {
  if (item.id) {
    return fetch({
      url: 'api/order-server-config/' + item.id + '/',
      method: 'put',
      data: item
    })
  } else {
    return fetch({
      url: 'api/order-server-config/',
      method: 'post',
      data: item
    })
  }
}

export function deleteTestOrderServer(item) {
  return fetch({
    url: 'api/order-server-config/' + item.id + '/',
    method: 'delete'
  })
}

export function getTestStreamServer() {
  return fetch({
    url: 'api/stream-config/',
    method: 'get'
  })
}

export function updateTestStreamServer(item) {
  if (item.id) {
    return fetch({
      url: 'api/stream-config/' + item.id + '/',
      method: 'put',
      data: item
    })
  } else {
    return fetch({
      url: 'api/stream-config/',
      method: 'post',
      data: item
    })
  }
}

export function deleteTestStreamServer(item) {
  return fetch({
    url: 'api/stream-config/' + item.id + '/',
    method: 'delete'
  })
}

export function getTestExecution() {
  return fetch({
    url: 'api/execution/',
    method: 'get'
  })
}

export function opStreamServer(operation, id) {
  const data = {
    configId: id
  }
  return fetch({
    url: 'stream-server/' + operation,
    method: 'post',
    data: data
  })
}

export function sendPost(data){
  return fetch({
    url: '/bills/getBillsIntentions/' ,
    method: 'post',
    data: data
  })
}

export function ss(data){
  return fetch({
    url: '/bills/filterbill/' ,
    method: 'post',
    data: data
  })
}
export function opOrderServer(operation, id) {
  const data = {
    configId: id
  }
  return fetch({
    url: 'order-server/' + operation,
    method: 'post',
    data: data
  })
}
