
import React, { Component } from 'react'

import { Form, Input, Select, Button } from 'semantic-ui-react'

export default class RealEstatesSearch extends Component {

  state = {
    searchByName: '',
    searchByCNPJ: '',
    searchByState: null,
    searchByCity: null,
    cities: []
  }

  search = (e) => {
    e.preventDefault()

    const { searchByName, searchByCNPJ, searchByState, searchByCity } = this.state
    this.props.onFilter(searchByName, searchByCNPJ, searchByState, searchByCity)
  }

  clearSearchForm = (e) => {
    e.preventDefault()
    
    this.props.fetchInitialRealEstatesPage()

    this.setState({
      searchByName: '',
      searchByCNPJ: '',
      searchByState: null,
      searchByCity: null
    })
  }

  handleCityNameSearchChange = async (e, { searchQuery }) => {
    let cities = await this.props.fetchCities(searchQuery, this.state.searchByState)
    this.setState({ cities: cities.data.map((e) => ({ key: e.id, text: e.name, value: e.id })) })
  }

  handleCitySearchFocus = async (e, data) => {
    let cities = await this.props.fetchCities(null, this.state.searchByState)
    this.setState({ cities: cities.data.map((e) => ({ key: e.id, text: e.name, value: e.id })) })
  }

  render() {
    const { cities } = this.state

    return (
      <Form size='small'>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>Razão Social</label>
            <Input 
              placeholder='Razão Social da Imobiliária' 
              className='form-input' 
              onChange={e => this.setState({ searchByName: e.target.value })}
              value={this.state.searchByName} />
          </Form.Field>
          
          <Form.Field>
            <label>CNPJ</label> 
            <Input 
              label='#' placeholder='99.999.999/9999-99' 
              className='form-input' 
              onChange={e => this.setState({ searchByCNPJ: e.target.value })}
              value={this.state.searchByCNPJ}/>
          </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field>
            <label>Estado</label>
            <Select 
              placeholder='Selecione o Estado do endereço da Imobiliária' 
              className='form-select'
              search 
              options={this.props.states}
              onChange={(e, {value}) => this.setState({ searchByState: value })} 
              value={this.state.searchByState} />
          </Form.Field>

          <Form.Field>
            <label>Cidade</label>
            <Select 
              placeholder='Selecione a Cidade do endereço da Imobiliária' 
              className='form-select'
              search
              options={cities} 
              onFocus={this.handleCitySearchFocus}
              onSearchChange={this.handleCityNameSearchChange}
              onChange={(e, {value}) => this.setState({ searchByCity: value })} 
              value={this.state.searchByCity}/>
          </Form.Field>
        </Form.Group>

        <Button color='blue' size='small' style={{width: 90}} onClick={this.search}>Buscar</Button>
        <Button color='blue' size='small' style={{width: 90}} onClick={this.clearSearchForm}>Limpar</Button>
        <Button color='green' size='small' style={{width: 90}} onClick={this.toggleCreateModalVisibility}>Adicionar</Button>
      </Form>
    )
  }

}