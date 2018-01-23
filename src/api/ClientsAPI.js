
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

}
