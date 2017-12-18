
import React, { Component } from 'react'

import { Form, Input, Divider, Header } from 'semantic-ui-react'

export default class RealEstateForm extends Component {

  constructor(props) {
    super(props)

    // prepare for edit RealEstate
    if(props.realEstate) {
      const realEstate = props.realEstate
      this.initializeFormForEdit(realEstate)

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

        ...this.getInitialFormStateErrors(),

        cities: []
      }
    }
  }

  initializeFormForEdit(realEstate) {
    this.state = {
      id: realEstate.id,
      name: realEstate.name,
      cnpj: realEstate.cnpj.toString(),
      cofeci: realEstate.cofeci.toString(),

      addressNumber: (realEstate.addressNumber === null) ? '' : realEstate.addressNumber.toString(),
      addressDescription: (realEstate.addressDescription === null) ? '' : realEstate.addressDescription.toString(),

      addressZipCodeId: realEstate.addressZipCode.id,
      addressPostalCode: realEstate.addressZipCode.postalCode,
      addressStreet: realEstate.addressZipCode.street,
      addressRegion: realEstate.addressZipCode.region,
      addressState: realEstate.addressZipCode.city.state.id,
      addressCity: realEstate.addressZipCode.city.id,

      ...this.getInitialFormStateErrors(),

      cities: []
    }

    if(realEstate.addressZipCode.city) {
      const city = realEstate.addressZipCode.city

      this.state = {
        ...this.state, 
        cities: [{ key: city.id, text: city.name, value: city.id }]
      }
    }
  }

  getInitialFormStateErrors() {
    return {
      nameError: false,
      cnpjError: false,
      cofeciError: false,
      addressPostalCodeError: false
    }
  }

  componentDidMount() { }

  formHasFieldsWithErrors() {
    let errors = {
      nameError: (this.state.name.trim() === ''),
      cnpjError: (this.state.cnpj.trim() === ''),
      cofeciError: (this.state.cofeci.trim() === '')
    }

    if(this.state.addressPostalCode.trim() === '')
      errors = {...errors, addressPostalCodeError: true}
    else
      errors = {...errors, addressPostalCodeError: false}

    this.setState({...errors})
    
    const fieldsWithErrors = Object.keys(errors)
      .filter(k => { return errors[k] === true })

    return fieldsWithErrors.length > 0
  }

  getRealEstate() {
    return {
      id: this.state.id,
      name: this.state.name,
      cnpj: parseInt(this.state.cnpj),
      cofeci: parseInt(this.state.cofeci),

      addressNumber: (this.state.addressNumber.trim() === '') ? null : parseInt(this.state.addressNumber),
      addressDescription: (this.state.addressDescription.trim() === '') ? null : this.state.addressDescription,

      addressZipCode: {
        id: this.state.addressZipCodeId
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

  handlePostalCodeBlur = e => {
    const {addressPostalCode} = this.state
    this.props.fetchZipCodeByPostalCode(addressPostalCode)
      .then(r => {
        const city = r.data.city

        this.setState({
          addressZipCodeId: r.data.id,
          addressStreet: r.data.street,
          addressRegion: r.data.region,
          addressState: city.state.id,
          addressCity: city.id,
          cities: [{ key: city.id, text: city.name, value: city.id }]
        })
      })
      .catch(error => {
        this.props.fetchZipCodeWithViaCep(addressPostalCode)
          .then(r => console.log(r.data))
          .catch(error => console.log(error))
      })
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
              value={this.state.addressPostalCode}
              onBlur={this.handlePostalCodeBlur} />
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