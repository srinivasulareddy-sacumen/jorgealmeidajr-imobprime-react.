
import React, { Component } from 'react'

import { Form, Input, Select, Button } from 'semantic-ui-react'

import StatesAPI from '../api/StatesAPI'
import CitiesAPI from '../api/CitiesAPI'

export default class ClientsSearchForm extends Component {

  state = {
    ...this.getInitialFormState(),

    states: [],
    cities: []
  }

  getInitialFormState() {
    return {
      name: '',
      cpf: '',
      stateId: null,
      cityId: null
    }
  }

  componentDidMount() {
    (async () => {
      try {
        const states = await this.fetchStates()
        const cities = await this.fetchInitialCities()

        this.setState({states, cities})
      } catch(error) {
        console.log(error)
      }
    })();
  }

  getSearchParams() {
    return { 
      name: this.state.name,
      cpf: this.state.cpf,
      stateId: this.state.stateId,
      cityId: this.state.cityId
    }
  }

  async fetchStates() {
    const resp = await StatesAPI.fetchAll()
    return resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
  }

  async fetchInitialCities() {
    const resp = await CitiesAPI.fetchAll()
    return resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
  }

  handleStateChange = async (e, {value}) => {
    try {
      const stateId = value

      const resp = await CitiesAPI.filter('', stateId)
      const cities = resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))

      this.setState({stateId, cityId: null, cities})
    } catch(error) {
      console.log(error)
      this.setState({stateId: null, cityId: null, cities: []})
    }
  }

  handleCityNameSearchChange = async (e, { searchQuery }) => {
    try {
      const resp = await CitiesAPI.filter(searchQuery, this.state.stateId)
      const cities = resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))

      this.setState({cityId: null, cities})
    } catch(error) {
      console.log(error)
      this.setState({cityId: null, cities: []})
    }
  }

  search = (e) => {
    e.preventDefault()

    const params = {
      name: this.state.name,
      cpf: this.state.cpf,
      stateId: this.state.stateId,
      cityId: this.state.cityId,
    }

    this.props.onFilter(params)
  }

  clearSearchForm = async (e) => {
    e.preventDefault()

    try {
      const cities = await this.fetchInitialCities()
      this.setState({...this.getInitialFormState(), cities})

      this.props.fetchInitialClients()
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const {states, cities} = this.state
    
    return (
      <Form size='small'>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>Nome</label>
            <Input 
              placeholder='Nome do Cliente' 
              className='form-input' 
              onChange={e => this.setState({name: e.target.value})}
              value={this.state.name} />
          </Form.Field>

          <Form.Field>
            <label>CPF</label>
            <Input 
              label='#' placeholder='999.999.999-99' 
              className='form-input' 
              onChange={e => this.setState({cpf: e.target.value})}
              value={this.state.cpf} />
          </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field>
            <label>Estado</label>
            <Select 
              placeholder='Selecione o Estado do Endereço do Cliente'
              className='form-select'
              search 
              options={states}
              onChange={this.handleStateChange} 
              value={this.state.stateId} />
          </Form.Field>

          <Form.Field>
            <label>Cidade</label>
            <Select 
              placeholder='Selecione a Cidade do Endereço do Cliente'
              className='form-select'
              search 
              options={cities}
              onSearchChange={this.handleCityNameSearchChange}
              onChange={(e, {value}) => this.setState({cityId: value})} 
              value={this.state.cityId} />
          </Form.Field>
        </Form.Group>

        <Button color='blue' size='small' style={{width: 90}} onClick={this.search}>Buscar</Button>
        <Button color='blue' size='small' style={{width: 90}} onClick={this.clearSearchForm}>Limpar</Button>
        <Button color='green' size='small' style={{width: 90}} onClick={this.props.toggleCreateModalVisibility}>Adicionar</Button>
      </Form>
    )
  }

}
