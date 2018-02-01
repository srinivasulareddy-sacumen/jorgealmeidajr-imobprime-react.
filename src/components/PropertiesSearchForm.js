
import React, { Component } from 'react'

import { Form, Input, Select, Button, Icon } from 'semantic-ui-react'

import PropertyTypesAPI from '../api/PropertyTypesAPI'
import PropertyStatesAPI from '../api/PropertyStatesAPI'
import StatesAPI from '../api/StatesAPI'
import CitiesAPI from '../api/CitiesAPI'

export default class PropertiesSearchForm extends Component {

  state = {
    ...this.getInitialFormState(),

    propertyTypes: [],
    propertyStates: [],
    states: [],
    cities: []
  }

  getInitialFormState() {
    return {
      ownerId: null,

      propertyTypeId: null,
      propertyStateId: null,
      
      stateId: null,
      cityId: null,

      priceMin: '',
      priceMax: '',

      areaMin: '',
      areaMax: ''
    }
  }

  componentDidMount() {
    (async () => {
      try {
        const states = await this.fetchStates()
        const cities = await this.fetchInitialCities()
        const propertyTypes = await this.fetchPropertyTypes()
        const propertyStates = await this.fetchPropertyStates()

        this.setState({
          propertyTypes, 
          propertyStates, 
          states, 
          cities
        })
      } catch(error) {
        console.log(error)
      }
    })();
  }

  async fetchStates() {
    const resp = await StatesAPI.fetchAll()
    return resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
  }

  async fetchInitialCities() {
    const resp = await CitiesAPI.fetchAll()
    return resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
  }

  async fetchPropertyTypes() {
    const resp = await PropertyTypesAPI.fetchAll()
    return resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
  }

  async fetchPropertyStates() {
    const resp = await PropertyStatesAPI.fetchAll()
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

  clearSearchForm = async (e) => {
    e.preventDefault()

    try {
      const cities = await this.fetchInitialCities()
      this.setState({...this.getInitialFormState(), cities})

      await this.props.fetchInitialProperties()
    } catch(error) {
      console.log(error)
    }
  }

  search = async (e) => {
    e.preventDefault()

    const params = {
      ownerId: this.state.ownerId,
      
      propertyTypeId: this.state.propertyTypeId,
      propertyStateId: this.state.propertyStateId,
      
      stateId: this.state.stateId,
      cityId: this.state.cityId,

      priceMin: this.state.priceMin,
      priceMax: this.state.priceMax,
      
      areaMin: this.state.areaMin,
      areaMax: this.state.areaMax,
    }

    await this.props.onFilter(params)
  }

  render() {
    const {propertyTypes, propertyStates, states, cities} = this.state
    
    return (
      <Form size='small'>
        <Form.Group>
          <Form.Field style={{width: '100%'}}>
            <label>TODO: Proprietário do Imóvel</label>
            <Form.Group inline>
              <Select search placeholder='Nome do Proprietátio do Imóvel' className='form-select' style={{width: '90%'}} />
              
              <Button color='blue' size='tiny' icon style={{marginLeft: 4}}>
                <Icon name='edit' />
              </Button>
            </Form.Group>
          </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field>
            <label>Tipo de Imóvel</label>
            <Select 
              placeholder='Selecione o Tipo de Imóvel' 
              className='form-select'
              search
              options={propertyTypes}
              onChange={(e, {value}) => this.setState({propertyTypeId: value})} 
              value={this.state.propertyTypeId} />
          </Form.Field>

          <Form.Field>
            <label>Situação do Imóvel</label>
            <Select 
              placeholder='Selecione a Situação do Imóvel' 
              className='form-select'
              search
              options={propertyStates}
              onChange={(e, {value}) => this.setState({propertyStateId: value})} 
              value={this.state.propertyStateId} />
          </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field>
            <label>Estado</label>
            <Select 
              placeholder='Selecione o Estado do Imóvel'
              className='form-select'
              search 
              options={states}
              onChange={this.handleStateChange} 
              value={this.state.stateId} />
          </Form.Field>

          <Form.Field>
            <label>Cidade</label>
            <Select 
              placeholder='Selecione a Cidade do Imóvel'
              className='form-select'
              search 
              options={cities}
              onSearchChange={this.handleCityNameSearchChange}
              onChange={(e, {value}) => this.setState({cityId: value})} 
              value={this.state.cityId} />
          </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field>
            <label>Preço inicial</label>
            <Input 
              label='R$' placeholder='0,00' className='form-input'
              onChange={e => this.setState({priceMin: e.target.value})}
              value={this.state.priceMin} />
          </Form.Field>

          <Form.Field>
            <label>Preço final</label>
            <Input 
              label='R$' placeholder='0,00' className='form-input' 
              onChange={e => this.setState({priceMax: e.target.value})}
              value={this.state.priceMax} />
          </Form.Field>

          <Form.Field>
            <label>Área inicial</label>
            <Input 
              label='m²' labelPosition='right' placeholder='0' className='form-input'
              onChange={e => this.setState({areaMin: e.target.value})}
              value={this.state.areaMin} />
          </Form.Field>

          <Form.Field>
            <label>Área final</label>
            <Input 
              label='m²' labelPosition='right' placeholder='0' className='form-input' 
              onChange={e => this.setState({areaMax: e.target.value})}
              value={this.state.areaMax} />
          </Form.Field>
        </Form.Group>

        <Button color='blue' size='small' style={{width: 90}} onClick={this.search}>Buscar</Button>
        <Button color='blue' size='small' style={{width: 90}} onClick={this.clearSearchForm}>Limpar</Button>
        <Button color='green' size='small' style={{width: 90}} onClick={this.props.toggleCreateModalVisibility}>Adicionar</Button>
      </Form>
    )
  }

}

