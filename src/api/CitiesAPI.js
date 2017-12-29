
import axios from 'axios'

const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:8080/api' : '/api'

export default class CitiesAPI {

  static fetchAll() {
    const request = axios({
      method: 'get',
      url: `${ROOT_URL}/cities`,
      headers: []
    })

    return request
  }

  static filter(name, stateId) {
    if(name === null) name = ''
    if(stateId === null) stateId = ''
    
    const request = axios({
      method: 'get',
      url: `${ROOT_URL}/cities/filter?name=${name}&stateId=${stateId}`,
      headers: []
    })

    return request
  }

  static fetchOne(name, stateAbbreviation) {
    const request = axios({
      method: 'get',
      url: `${ROOT_URL}/cities/${name}/${stateAbbreviation}`,
      headers: []
    })

    return request
  }

  static fetchAllByName(name) {
    const request = axios({
      method: 'get',
      url: `${ROOT_URL}/cities/filterByName?cityName=${name}`,
      headers: []
    })

    return request
  }

  static sortAscByString(value1, value2) {
    if (value1 < value2) // ASC
      return -1 
    if (value1 > value2)
      return 1
    return 0 // default return value (no sorting)
  }

  static getCidades() {
    const cidades = [
      { nome: 'Florianópolis' },
      { nome: 'Joinville' },
      { nome: 'São José' },
      { nome: 'Palhoça' },
      { nome: 'Blumenau' },
    ]

    let id = 1

    return cidades
      .sort((c1, c2) => this.sortAscByString(c1.nome.toLocaleLowerCase(), c2.nome.toLocaleLowerCase()))
      .map((cidade) => ({ id: id++, ...cidade }))
  }

  static getEstados() {
    const estados = [
      { nome: 'Santa Catarina' },
      { nome: 'Paraná' },
      { nome: 'Rio Grande do Sul' },
    ]

    let id = 1

    return estados
      .sort((e1, e2) => this.sortAscByString(e1.nome.toLocaleLowerCase(), e2.nome.toLocaleLowerCase()))
      .map((estado) => ({ id: id++, ...estado }))
  }

}
