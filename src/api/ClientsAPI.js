
import axios from 'axios'

const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:8080/api' : '/api'

export default class ClientsAPI {

  static fetchAll() {
    const request = axios({
      method: 'get',
      url: `${ROOT_URL}/clients`,
      headers: []
    })

    return request
  }

  static fetchAllByParams(params) {
    const request = axios({
      method: 'post',
      url: `${ROOT_URL}/search-clients`,
      headers: [],
      data: params
    })

    return request
  }

  static fetchById(id) {
    const request = axios({
      method: 'get',
      url: `${ROOT_URL}/clients/${id}`,
      headers: []
    })

    return request
  }

  static save(data) {
    const request  = axios({
      method: 'post',
      url: `${ROOT_URL}/clients`,
      headers: [],
      data
    })

    return request
  }

  static update(data) {
    const request  = axios({
      method: 'put',
      url: `${ROOT_URL}/clients`,
      headers: [],
      data
    })

    return request
  }

  static delete(id) {
    const request = axios({
      method: 'delete',
      url: `${ROOT_URL}/clients/${id}`,
      headers: []
    })

    return request
  }

}
