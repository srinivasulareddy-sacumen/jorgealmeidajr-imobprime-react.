
import React, { Component } from 'react'

import { Form, Input, Select, Divider, Header } from 'semantic-ui-react'

export default class RealEstateForm extends Component {

  constructor(props) {
    super(props)

    // prepare for edit RealEstate
    if(props.realEstate) {
      const realEstate = props.realEstate
      
      this.state = {
        id: realEstate.id,
        name: realEstate.name,
        cnpj: realEstate.cnpj,
        cofeci: realEstate.cofeci,

        addressNumber: realEstate.addressNumber,
        addressDescription: realEstate.addressDescription,

        addressPostalCode: realEstate.addressZipCode.postalCode,
        addressStreet: realEstate.addressZipCode.street,
        addressRegion: realEstate.addressZipCode.region,
        addressState: realEstate.addressZipCode.city.state.id,
        addressCity: realEstate.addressZipCode.city.id,

        nameError: false,
        cnpjError: false,
        cofeciError: false,
        addressPostalCodeError: false,

        cities: []
      }

      if(realEstate.addressZipCode.city) {
        const city = realEstate.addressZipCode.city

        this.state = {
          ...this.state, 
          cities: [{ key: city.id, text: city.name, value: city.id }]
        }
      }

    // prepare to create a new RealEstate
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

        nameError: false,
        cnpjError: false,
        cofeciError: false,
        addressPostalCodeError: false,

        cities: []
      }
    }
  }

  componentDidMount() {

  }

  formHasFieldsWithErrors() {
    let errors = {}

    if(this.state.name.trim() === '')
      errors = {...errors, nameError: true}
    else
      errors = {...errors, nameError: false}

    if(this.state.cnpj.trim() === '')
      errors = {...errors, cnpjError: true}
    else
      errors = {...errors, cnpjError: false}

    if(this.state.cofeci.trim() === '')
      errors = {...errors, cofeciError: true}
    else
      errors = {...errors, cofeciError: false}

    if(this.state.addressPostalCode.trim() === '')
      errors = {...errors, addressPostalCodeError: true}
    else
      errors = {...errors, addressPostalCodeError: false}

    this.setState({...errors})
    
    const fieldsWithErrors = Object.keys(errors)
      .filter(k => { return errors[k] === true })

    console.log(fieldsWithErrors)
    return fieldsWithErrors.length > 0
  }

  getRealEstate() {
    return {
      id: this.state.id,
      name: this.state.name,
      cnpj: this.state.cnpj,
      cofeci: this.state.cofeci,

      addressNumber: this.state.addressNumber,
      addressDescription: this.state.addressDescription,

      addressZipCode: {
        id: 14091, 
        postalCode: this.state.addressPostalCode
      }
    }
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
          <Form.Input 
            required
            error={this.state.nameError}
            label='Razão Social' 
            placeholder='Razão Social da Imobiliária' 
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name} />
          
          <Form.Field required error={this.state.cnpjError}>
            <label>CNPJ</label>
            <Input               
              label='#' 
              placeholder='99.999.999/9999-99'
              onChange={e => this.setState({ cnpj: e.target.value })}
              value={this.state.cnpj} />
          </Form.Field>

          <Form.Field required error={this.state.cofeciError}>
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
          <Form.Field width={4} required error={this.state.addressPostalCodeError}>
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