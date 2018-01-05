
import React, { Component } from 'react'

import { Form, Input, Button } from 'semantic-ui-react'

import CitiesAPI from '../api/CitiesAPI'
import ImoveisAPI from '../api/ImoveisAPI'
import PropertyTypesAPI from '../api/PropertyTypesAPI'


export default class HomePropertiesSearch extends Component {

  state = {
    propertyType: null,
    city: null,
    region: '',
    propertyState: null,
    priceMin: '',
    priceMax: '',
    areaMin: '',
    areaMax: '',
    bedrooms: '',
    garages: '',
    cities: [],
    propertyTypes: []
  }

  async componentDidMount() {
    const citiesResp = await CitiesAPI.fetchAllByName('')
    const cities = citiesResp.data.map((c) => ({ key: c.id, text: `${c.name}, ${c.state.name}`, value: c.id }))

    const propertyTypesResp = await PropertyTypesAPI.fetchAll()
    const propertyTypes = propertyTypesResp.data
      .sort(this.sortPropertyTypesAsc)
      .map((p) => ({ key: p.id, text: p.name, value: p.id }))

    this.setState({cities, propertyTypes})
  }

  sortPropertyTypesAsc = (p1, p2) => {
    let nameA = p1.name.toLowerCase(), nameB = p2.name.toLowerCase()
    if (nameA < nameB) //sort string ascending
        return -1 
    if (nameA > nameB)
        return 1
    return 0 //default return value (no sorting)
  }

  sortPropertyTypesDesc = (p1, p2) => {
    let nameA = p1.name.toLowerCase(), nameB = p2.name.toLowerCase()
    if (nameA > nameB) //sort string descending
        return -1 
    if (nameA < nameB)
        return 1
    return 0 //default return value (no sorting)
  }

  handlePropertyStateChange = (newState) => this.setState({ propertyState: newState })

  handleCityNameSearchChange = (e, {searchQuery}) => {
    CitiesAPI.fetchAllByName(searchQuery.trim())
      .then((resp) => {
        const cities = resp.data.map((c) => ({ key: c.id, text: `${c.name}, ${c.state.name}`, value: c.id }))
        this.setState({cities})
      })
  }

  handleSearchButtonClicked = () => {
    ImoveisAPI.fetchProperties(this.getSearchParamsFromState(this.state))
      .then((resp) => {
        this.props.onSearch(this.state.city, resp)
        this.props.toggleSearchFormVisibility()
      })
  }

  getSearchParamsFromState = state => {
    return {
      city: state.city,
      propertyType: state.propertyType,
      region: (state.region.trim() === '') ? null : state.region,
      propertyState: state.propertyState,
      priceMin: (state.priceMin.trim() === '') ? null : state.priceMin,
      priceMax: (state.priceMax.trim() === '') ? null : state.priceMax,
      areaMin: (state.areaMin.trim() === '') ? null : state.areaMin,
      areaMax: (state.areaMax.trim() === '') ? null : state.areaMax,
      bedrooms: state.bedrooms,
      garages: state.garages
    }
  }

  render() {
    return(
      <Form size='small'>
        <Form.Select 
          label='Tipo do Imóvel' placeholder='Tipo do Imóvel' 
          options={this.state.propertyTypes}
          onChange={(e, {value}) => this.setState({ propertyType: value })} 
          value={this.state.propertyType} />

        <Form.Select 
          label='Cidade' placeholder='Cidade'
          search 
          options={this.state.cities} 
          onSearchChange={this.handleCityNameSearchChange}
          onChange={(e, {value}) => this.setState({ city: value })} 
          value={this.state.city} />
        
        <Form.Input 
          label='Bairro' placeholder='Bairro' 
          onChange={e => this.setState({ region: e.target.value })}
          value={this.state.region} />

        <Form.Group inline>
          <label>Disponível para</label>
          <Form.Radio 
            label='Venda' value='for_sale' 
            checked={this.state.propertyState === 'for_sale'} 
            onChange={() => this.handlePropertyStateChange('for_sale')} />

          <Form.Radio 
            label='Aluguel' value='for_rent' 
            checked={this.state.propertyState === 'for_rent'} 
            onChange={() => this.handlePropertyStateChange('for_rent')} />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field>
            <label>Preço inicial</label>
            <Input 
              label='R$' placeholder='0,00'
              onChange={e => this.setState({ priceMin: e.target.value })}
              value={this.state.priceMin} />
          </Form.Field>

          <Form.Field>
            <label>Preço final</label>
            <Input 
              label='R$' placeholder='0,00'
              onChange={e => this.setState({ priceMax: e.target.value })}
              value={this.state.priceMax} />
          </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>                  
          <Form.Field>
            <label>Área inicial</label>
            <Input 
              label='m²' labelPosition='right' placeholder='0'
              onChange={e => this.setState({ areaMin: e.target.value })}
              value={this.state.areaMin} />
          </Form.Field>

          <Form.Field>
            <label>Área final</label>
            <Input 
              label='m²' labelPosition='right' placeholder='0'
              onChange={e => this.setState({ areaMax: e.target.value })}
              value={this.state.areaMax} />
          </Form.Field>
        </Form.Group>

        <Form.Group inline>
          <label>Quartos</label>
          <Form.Radio 
            label='1' 
            checked={this.state.bedrooms === '1'} 
            onChange={() => this.setState({ bedrooms: '1' })} />

          <Form.Radio 
            label='2'
            checked={this.state.bedrooms === '2'} 
            onChange={() => this.setState({ bedrooms: '2' })} />

          <Form.Radio 
            label='+3'
            checked={this.state.bedrooms === '+3'} 
            onChange={() => this.setState({ bedrooms: '+3' })} />
        </Form.Group>

        <Form.Group inline>
          <label>Garagens</label>
          <Form.Radio 
            label='1' 
            checked={this.state.garages === '1'} 
            onChange={() => this.setState({ garages: '1' })} />

          <Form.Radio 
            label='2' 
            checked={this.state.garages === '2'}
            onChange={() => this.setState({ garages: '2' })} />

          <Form.Radio 
            label='+3' 
            checked={this.state.garages === '+3'}
            onChange={() => this.setState({ garages: '+3' })} />
        </Form.Group>

        <Button 
          color='red' size='small' icon='remove' content='Cancelar'
          onClick={() => this.props.toggleSearchFormVisibility()}
        />
        <Button 
          color='blue' size='small' icon='search' content='Buscar' 
          onClick={this.handleSearchButtonClicked}
        />
      </Form>
    )
  }

}