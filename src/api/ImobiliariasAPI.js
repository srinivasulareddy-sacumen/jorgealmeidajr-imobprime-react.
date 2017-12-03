
import axios from 'axios'

const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:8080/api' : '/api'
// const ROOT_URL = 'http://localhost:8080/api'

export default class ImobiliariasAPI {

  static fetchAll() {
    const request = axios({
      method: 'get',
      url: `${ROOT_URL}/real-estates`,
      headers: []
    })

    return request
  }

}