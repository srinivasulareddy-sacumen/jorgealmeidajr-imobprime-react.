
import axios from 'axios'

const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:8080/api' : '/api'

export default class StatesAPI {

  static fetchAll() {
    const request = axios({
      method: 'get',
      url: `${ROOT_URL}/states`,
      headers: []
    })

    return request
  }

}