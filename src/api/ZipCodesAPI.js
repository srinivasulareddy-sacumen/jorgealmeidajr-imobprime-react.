
import axios from 'axios'

const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:8080/api' : '/api'

export default class ZipCodesAPI {

  static fetchByPostalCode(postalCode) {
    const request = axios({
      method: 'get',
      url: `${ROOT_URL}/zipcodes/${postalCode}`,
      headers: []
    })

    return request
  }

  static fetchWithViaCep(postalCode) {
    const request = axios({
      method: 'get',
      url: `https://viacep.com.br/ws/${postalCode}/json/`,
      headers: []
    })

    return request
  }

  static save(data) {
    const request  = axios({
      method: 'post',
      url: `${ROOT_URL}/zipcodes`,
      headers: [],
      data
    })

    return request
  }

}