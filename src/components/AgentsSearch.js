
import React, { Component } from 'react'

import { Form, Input, Select, Button } from 'semantic-ui-react'

import RealEstatesAPI from '../api/RealEstatesAPI'
import StatesAPI from '../api/StatesAPI'
import CitiesAPI from '../api/CitiesAPI'

export default class AgentsSearch extends Component {

  state = {
    ...this.getInitialFormState(),

    realEstates: [],
    states: [],
    cities: []
  }

  componentDidMount() {
    this.fetchInitialRealEstates()

    StatesAPI.fetchAll()
      .then((resp) => {
        const states = resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
        this.setState({states})
      })
      .catch((error) => console.log(error))

    this.fetchInitialCities()
  }

  fetchInitialRealEstates = () => {
    RealEstatesAPI.fetchAll()
      .then((resp) => {
        const realEstates = resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
        this.setState({realEstates})
      })
      .catch((error) => console.log(error))
  }

  fetchInitialCities = () => {
    CitiesAPI.fetchAll()
      .then((resp) => {
        const cities = resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
        this.setState({cities})
      })
      .catch((error) => console.log(error))
  }

  getInitialFormState() {
    return {
      name: '',
      cpf: '',
      creci: '',
      realEstateId: null,
      stateId: null,
      cityId: null
    }
  }

  clearSearchForm = (e) => {
    e.preventDefault()

    this.setState({...this.getInitialFormState()})

    this.fetchInitialRealEstates()
    this.fetchInitialCities()
    this.props.fetchInitialAgents()
  }

  search = (e) => {
    e.preventDefault()

    const params = {
      name: this.state.name,
      cpf: this.state.cpf,
      creci: this.state.creci,
      realEstateId: this.state.realEstateId,
      stateId: this.state.stateId,
      cityId: this.state.cityId,
    }

    this.props.onFilter(params)
  }

  handleRealEstateNameSearchChange = (e, {searchQuery}) => {
    RealEstatesAPI.fetchAllByName(searchQuery.trim())
      .then((resp) => {
        const realEstates = resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
        this.setState({realEstates})
      })
      .catch((error) => {
        console.log(error)
        this.setState({realEstates: []})
      })
  }

  handleStateChange = (e, {value}) => {
    const stateId = value
    this.setState({stateId})

    CitiesAPI.filter('', stateId)
      .then((resp) => {
        const cities = resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
        this.setState({cityId: null, cities})
      })
      .catch((error) => {
        console.log(error)
        this.setState({cityId: null, cities: []})
      })
  }

  handleCityNameSearchChange = (e, { searchQuery }) => {
    CitiesAPI.filter(searchQuery, this.state.stateId)
      .then((resp) => {
        const cities = resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
        this.setState({cityId: null, cities})
      })
      .catch((error) => {
        console.log(error)
        this.setState({cityId: null, cities: []})
      })
  }

  render() {
    const {realEstates, states, cities} = this.state
    
    return (
      <Form size='small'>
        <Form.Group>
          <Form.Field width={8}>
            <label>Nome</label>
            <Input 
              placeholder='Nome do Corretor' 
              className='form-input' 
              onChange={e => this.setState({name: e.target.value})}
              value={this.state.name} />
          </Form.Field>
          
          <Form.Field width={4}>
            <label>CPF</label>
            <Input 
              label='#' placeholder='999.999.999-99' 
              className='form-input' 
              onChange={e => this.setState({cpf: e.target.value})}
              value={this.state.cpf} />
          </Form.Field>

          <Form.Field width={4}>
            <label>CRECI</label>
            <Input 
              placeholder='0' 
              className='form-input' 
              onChange={e => this.setState({creci: e.target.value})}
              value={this.state.creci} />
          </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field>
            <label>Imobiliária</label>
            <Select 
              placeholder='Selecione a Imobiliária'
              className='form-select'
              search 
              options={realEstates}
              onSearchChange={this.handleRealEstateNameSearchChange}
              onChange={(e, {value}) => this.setState({realEstateId: value})} 
              value={this.state.realEstateId} />
          </Form.Field>
          
          <Form.Field>
            <label>Estado</label>
            <Select 
              placeholder='Selecione o Estado de atuação do Corretor'
              className='form-select'
              search 
              options={states}
              onChange={this.handleStateChange} 
              value={this.state.stateId} />
          </Form.Field>

          <Form.Field>
            <label>Cidade</label>
            <Select 
              placeholder='Selecione a Cidade de atuação do Corretor'
              className='form-select'
              search 
              options={cities}
              onSearchChange={this.handleCityNameSearchChange}
              onChange={(e, {value}) => this.setState({cityId: value})} 
              value={this.state.cityId} />
          </Form.Field>
        </Form.Group>

        {/*JSON.stringify(this.state, null, 2)*/}

        <Button color='blue' size='small' style={{width: 90}} onClick={this.search}>Buscar</Button>
        <Button color='blue' size='small' style={{width: 90}} onClick={this.clearSearchForm}>Limpar</Button>
        <Button color='green' size='small' style={{width: 90}} onClick={this.toggleCreateModalVisibility}>Adicionar</Button>
      </Form>
    )
  }

}