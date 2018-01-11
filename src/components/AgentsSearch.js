
import React, { Component } from 'react'

import { Form, Input, Select, Button } from 'semantic-ui-react'

import RealEstatesAPI from '../api/RealEstatesAPI'
import StatesAPI from '../api/StatesAPI'
import CitiesAPI from '../api/CitiesAPI'

export default class AgentsSearch extends Component {

  state = {
    searchByName: '',
    searchByCPF: '',
    searchByCreci: '',
    searchByRealEstate: null,
    searchByState: null,
    searchByCity: null,

    realEstates: [],
    states: [],
    cities: []
  }

  componentDidMount() {
    RealEstatesAPI.fetchAll()
      .then((resp) => {
        const realEstates = resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
        this.setState({realEstates})
      })
      .catch((error) => console.log(error))

    StatesAPI.fetchAll()
      .then((resp) => {
        const states = resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
        this.setState({states})
      })
      .catch((error) => console.log(error))

    CitiesAPI.fetchAll()
      .then((resp) => {
        const cities = resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
        this.setState({cities})
      })
      .catch((error) => console.log(error))
  }

  clearSearchForm = (e) => {
    e.preventDefault()
    
    // this.props.fetchInitialRealEstatesPage()

    this.setState({
      searchByName: '',
      searchByCPF: '',
      searchByCreci: '',
      searchByRealEstate: null,
      searchByState: null,
      searchByCity: null
    })
  }

  search = (e) => {
    e.preventDefault()

    const params = {
      name: this.state.searchByName,
      cpf: this.state.searchByCPF,
      creci: this.state.searchByCreci,
      realEstateId: this.state.searchByRealEstate,
      stateId: this.state.searchByState,
      cityId: this.state.searchByCity,
    }

    this.props.onFilter(params)
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
              onChange={e => this.setState({searchByName: e.target.value})}
              value={this.state.searchByName} />
          </Form.Field>
          
          <Form.Field width={4}>
            <label>CPF</label>
            <Input 
              label='#' placeholder='999.999.999-99' 
              className='form-input' 
              onChange={e => this.setState({searchByCPF: e.target.value})}
              value={this.state.searchByCPF} />
          </Form.Field>

          <Form.Field width={4}>
            <label>CRECI</label>
            <Input 
              placeholder='0' 
              className='form-input' 
              onChange={e => this.setState({searchByCreci: e.target.value})}
              value={this.state.searchByCreci} />
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
              onChange={(e, {value}) => this.setState({searchByRealEstate: value})} 
              value={this.state.searchByRealEstate} />
          </Form.Field>
          
          <Form.Field>
            <label>Estado</label>
            <Select 
              placeholder='Selecione o Estado de atuação do Corretor'
              className='form-select'
              search 
              options={states}
              onChange={(e, {value}) => this.setState({searchByState: value})} 
              value={this.state.searchByState} />
          </Form.Field>

          <Form.Field>
            <label>Cidade</label>
            <Select 
              placeholder='Selecione a Cidade de atuação do Corretor'
              className='form-select'
              search 
              options={cities}
              onChange={(e, {value}) => this.setState({searchByCity: value})} 
              value={this.state.searchByCity} />
          </Form.Field>
        </Form.Group>

        {/* JSON.stringify(this.state, null, 2) */}

        <Button color='blue' size='small' style={{width: 90}} onClick={this.search}>Buscar</Button>
        <Button color='blue' size='small' style={{width: 90}} onClick={this.clearSearchForm}>Limpar</Button>
        <Button color='green' size='small' style={{width: 90}} onClick={this.toggleCreateModalVisibility}>Adicionar</Button>
      </Form>
    )
  }

}