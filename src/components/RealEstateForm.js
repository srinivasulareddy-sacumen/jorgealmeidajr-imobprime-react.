
import React, { Component } from 'react'

import { Form, Input, Select, Divider, Header } from 'semantic-ui-react'

export default class RealEstateForm extends Component {

  constructor(props) {
    super(props)

    if(props.realEstate) {
      this.state = {
        id: props.realEstate.id,
        name: props.realEstate.name,
        cnpj: props.realEstate.cnpj,
        cofeci: props.realEstate.cofeci,

        addressNumber: props.realEstate.adressNumber,
        addressDescription: props.realEstate.adressDescription,
        addressState: props.realEstate.addressZipCode.city.state.id,
        addressCity: props.realEstate.addressZipCode.city.id,

        cities: []
      }

      if(props.realEstate.addressZipCode.city) {
        this.state = {...this.state, cities: [{key:4500, text:'Florianopoolis', value:4500}]}
      }

    } else {
      this.state = {
        id: null,
        name: '',
        cnpj: '',
        cofeci: '',

        addressPostalCode: '',
        addressStreet: '',
        addressRegion: '',
        addressNumber: '',
        addressDescription: '',
        addressState: null,
        addressCity: null,

        cities: []
      }
    }
  }

  getRealEstate() {
    return Object.assign({}, this.state)
  }

  handleAfterStateChange = () => {
    this.setState({ addressCity: null, cities: [] })
  }

  handleCityNameSearchChange = async (e, { searchQuery }) => {
    let cities = await this.props.fetchCities(searchQuery, this.state.addressState)
    this.setState({ cities: cities.data.map((e) => ({ key: e.id, text: e.name, value: e.id })) })
  }

  handleCitySearchFocus = async (e, data) => {
    let cities = await this.props.fetchCities(null, this.state.addressState)
    this.setState({ cities: cities.data.map((e) => ({ key: e.id, text: e.name, value: e.id })) })
  }

  resetForm = () => {
    this.setState({
      name: '',
      cnpj: '',
      cofeci: '',

      addressPostalCode: '',
      addressStreet: '',
      addressRegion: '',
      addressNumber: '',
      addressDescription: '',
      addressState: null,
      addressCity: null,

      cities: []
    })
  }

  render() {
    const { cities } = this.state

    return (
      <Form size='small'>
        <Form.Group widths='equal'>
          {/* error */}
          <Form.Input 
            required
            label='Razão Social' 
            placeholder='Razão Social da Imobiliária' 
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name} />
          
          {/* error */}
          <Form.Field required>
            <label>CNPJ</label>
            <Input 
              label='#' 
              placeholder='99.999.999/9999-99'
              onChange={e => this.setState({ cnpj: e.target.value })}
              value={this.state.cnpj} />
          </Form.Field>

          {/* error */}
          <Form.Field required>
            <label>COFECI</label>
            <Input 
              placeholder='0'
              onChange={e => this.setState({ cofeci: e.target.value })}
              value={this.state.cofeci} />
          </Form.Field>
        </Form.Group>

        <Form.Input type="file" label='Logo da Imobiliária' />

        <Divider />

        <Header size='medium'>Endereço da sede</Header>
        <Form.Group>
          {/* error */}
          <Form.Field width={4} required>
            <label>CEP</label>
            <Input 
              label='#' 
              placeholder='99.999-999'
              onChange={e => this.setState({ addressPostalCode: e.target.value })}
              value={this.state.addressPostalCode} />
          </Form.Field>

          <Form.Input 
            label='Rua' 
            placeholder='Rua' 
            width={6} 
            onChange={e => this.setState({ addressStreet: e.target.value })}
            value={this.state.addressStreet} />

          <Form.Input 
            label='Bairro' 
            placeholder='Bairro' 
            width={6} 
            onChange={e => this.setState({ addressRegion: e.target.value })}
            value={this.state.addressRegion}/>
        </Form.Group>

        <Form.Group>
          <Form.Input 
            label='Número' 
            placeholder='0' 
            width={4}
            onChange={e => this.setState({ addressNumber: e.target.value })}
            value={this.state.addressNumber} />

          <Form.Input 
            label='Complemento' 
            placeholder='Complemento' 
            width={6} 
            onChange={e => this.setState({ addressDescription: e.target.value })}
            value={this.state.addressDescription} />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Select 
            label='Estado' 
            placeholder='Estado' 
            search 
            options={this.props.states} 
            onChange={(e, {value}) => this.setState({ addressState: value }, this.handleAfterStateChange)} 
            value={this.state.addressState} />

          <Form.Select 
            label='Cidade' 
            placeholder='Cidade' 
            search 
            options={cities} 
            onFocus={this.handleCitySearchFocus}
            onSearchChange={this.handleCityNameSearchChange}
            onChange={(e, {value}) => this.setState({ addressCity: value })} 
            value={this.state.addressCity} />
        </Form.Group>
      </Form>
    )
  }

}