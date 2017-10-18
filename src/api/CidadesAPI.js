
export default class CidadesAPI {

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
      .sort((c1, c2) => CidadesAPI.sortAscByString(c1.nome.toLocaleLowerCase(), c2.nome.toLocaleLowerCase()))
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
      .sort((e1, e2) => CidadesAPI.sortAscByString(e1.nome.toLocaleLowerCase(), e2.nome.toLocaleLowerCase()))
      .map((estado) => ({ id: id++, ...estado }))
  }

}
