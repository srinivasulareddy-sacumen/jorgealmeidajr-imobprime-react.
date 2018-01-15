
import React, { Component } from 'react'

import { Form, Input, Select, Button, Divider } from 'semantic-ui-react'

import RealEstatesAPI from '../api/RealEstatesAPI'
import StatesAPI from '../api/StatesAPI'
import CitiesAPI from '../api/CitiesAPI'

export default class AgentForm extends Component {

  constructor(props) {
    super(props)

    // prepare for EDIT
    if(props.agent) {
      
    // prepare to CREATE
    } else {
      this.state = {
        id: null,
        realEstate: {id: null},
        name: '',
        cpf: '',
        creci: '',
        email: '',
        site: '',
        phoneNumber: '',
        cellPhoneNumber: '',
        state: {id: null},
        city: {id: null},
        realEstates: [],
        states: [],
        cities: []
      }

      this.fetchRealEstates()
      this.fetchStates()
      this.fetchInitialCities()
    }
  }

  fetchRealEstates = () => {
    RealEstatesAPI.fetchAll()
      .then((resp) => {
        const realEstates = resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
        this.setState({realEstates})
      })
      .catch((error) => console.log(error))
  }

  fetchStates = () => {
    StatesAPI.fetchAll()
      .then((resp) => {
        const states = resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
        this.setState({states})
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
    this.setState({state: {id: stateId}})

    CitiesAPI.filter('', stateId)
      .then((resp) => {
        const cities = resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
        this.setState({city: {id: null}, cities})
      })
      .catch((error) => {
        console.log(error)
        this.setState({city: {id: null}, cities: []})
      })
  }

  handleCityNameSearchChange = (e, { searchQuery }) => {
    CitiesAPI.filter(searchQuery, this.state.state.id)
      .then((resp) => {
        const cities = resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
        this.setState({city: {id: null}, cities})
      })
      .catch((error) => {
        console.log(error)
        this.setState({city: {id: null}, cities: []})
      })
  }

  render() {
    const {realEstates, states, cities} = this.state

    return (
      <Form size='small'>
        {/*JSON.stringify(this.state, null, 2)*/}

        <Form.Group widths='equal'>
          <Form.Field required error>
            <label>Imobiliária</label>
            <Select 
              placeholder='Selecione a Imobiliária'
              search 
              options={realEstates}
              onSearchChange={this.handleRealEstateNameSearchChange}
              onChange={(e, {value}) => this.setState({realEstate: {id: value}})} 
              value={this.state.realEstate.id} />
          </Form.Field>

          <Form.Field required error>
            <label>Nome</label>
            <Input 
              placeholder='Nome do Corretor' 
              onChange={e => this.setState({name: e.target.value})}
              value={this.state.name} />
          </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field required error>
            <label>CPF</label>
            <Input 
              label='#' placeholder='999.999.999-99' 
              onChange={e => this.setState({cpf: e.target.value})}
              value={this.state.cpf} />
          </Form.Field>

          <Form.Field required error>
            <label>CRECI</label>
            <Input 
              placeholder='0' 
              onChange={e => this.setState({creci: e.target.value})}
              value={this.state.creci} />
          </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field required error>
            <label>Email</label>
            <Input 
              label='@' placeholder='Email do Corretor'
              onChange={e => this.setState({email: e.target.value})}
              value={this.state.email} />
          </Form.Field>

          <Form.Field>
            <label>Site</label>
            <Input 
              label='http://' placeholder='Site do Corretor'
              onChange={e => this.setState({site: e.target.value})}
              value={this.state.site} />
          </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field>
            <label>Telefone</label>
            <Input 
              label='#' placeholder='(99) 9999-9999'
              onChange={e => this.setState({phoneNumber: e.target.value})}
              value={this.state.phoneNumber} />
          </Form.Field>

          <Form.Field>
            <label>Celular</label>
            <Input 
              label='#' placeholder='(99) 99999-9999'
              onChange={e => this.setState({cellPhoneNumber: e.target.value})}
              value={this.state.cellPhoneNumber} />
          </Form.Field>
        </Form.Group>

        <Divider />

        <Form.Group widths='equal'>
          <Form.Field required error>
            <label>Estado</label>
            <Select 
              placeholder='Selecione o Estado de atuação do Corretor'
              search 
              options={states}
              onChange={this.handleStateChange} 
              value={this.state.state.id} />
          </Form.Field>

          <Form.Field>
            <label>Cidade</label>
            <Select 
              placeholder='Selecione a Cidade de atuação do Corretor'
              search 
              options={cities}
              onSearchChange={this.handleCityNameSearchChange}
              onChange={(e, {value}) => this.setState({city: {id: value}})} 
              value={this.state.city.id} />
          </Form.Field>
        </Form.Group>
      </Form>
    )
  }

}