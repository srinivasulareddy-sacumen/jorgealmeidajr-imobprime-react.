
import React, { Component } from 'react'

import { Form, Input, Button } from 'semantic-ui-react'

import CitiesAPI from '../api/CitiesAPI'


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
    cities: []
  }

  componentDidMount() {
    CitiesAPI.fetchAllByName('')
      .then((resp) => {
        const cities = resp.data.map((c) => ({ key: c.id, text: `${c.name}, ${c.state.name}`, value: c.id }))
        this.setState({cities})
      })
  }

  handlePropertyStateChange = (newState) => this.setState({ propertyState: newState })

  handleCityNameSearchChange = (e, {searchQuery}) => {
    CitiesAPI.fetchAllByName(searchQuery.trim())
      .then((resp) => {
        const cities = resp.data.map((c) => ({ key: c.id, text: `${c.name}, ${c.state.name}`, value: c.id }))
        this.setState({cities})
      })
  }

  render() {
    return(
      <Form size='small'>
        <Form.Select 
          label='Tipo do Imóvel' placeholder='Tipo do Imóvel' 
          options={this.props.tiposImovel} />

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
          onClick={() => this.toggleSearchFormVisibility()}
        />
        <Button 
          color='blue' size='small' icon='search' content='Buscar' 
          onClick={() => this.toggleSearchFormVisibility()}
        />
      </Form>
    )
  }

}