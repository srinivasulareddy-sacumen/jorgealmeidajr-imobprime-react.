
import axios from 'axios'

const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:8080/api' : '/api'

export default class RealEstatesAPI {

  static fetchAll() {
    const request = axios({
      method: 'get',
      url: `${ROOT_URL}/real-estates`,
      headers: []
    })

    return request
  }

  static filter(name, cnpj, stateId, cityId) {
    if(name === null) name = ''
    if(cnpj === null) cnpj = ''
    if(stateId === null) stateId = ''
    if(cityId === null) cityId = ''
    
    const request = axios({
      method: 'get',
      url: `${ROOT_URL}/real-estates/filter?name=${name}&cnpj=${cnpj}&stateId=${stateId}&cityId=${cityId}`,
      headers: []
    })

    return request
  }

}