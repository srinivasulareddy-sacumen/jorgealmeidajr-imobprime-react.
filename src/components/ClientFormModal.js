
import React, { Component } from 'react'

import { Form, Input, Select, Divider, Header, Button, Modal } from 'semantic-ui-react'

import StatesAPI from '../api/StatesAPI'
import CitiesAPI from '../api/CitiesAPI'
import ZipCodesAPI from '../api/ZipCodesAPI'

export default class ClientFormModal extends Component {

  constructor(props) {
    super(props)

    if(props.client && props.client.id) {
      this.initStateForEdit(props.client)
    } else {
      this.initStateForCreate()
    }
  }

  initStateForEdit(client) {
    this.state = {
      ...this.getInitialStateErrors(),

      states: [],
      cities: [],
    }
  }

  initStateForCreate() {
    this.state = {
      id: null,
      name: '',
      cpf: '',
      email: '',
      phoneNumber: '',
      cellPhoneNumber: '',

      postalCode: '',
      region: '',
      street: '',
      type: '',
      addressNumber: '',
      addressDescription: '',
      stateId: null,
      cityId: null,
      
      ...this.getInitialStateErrors(),

      states: [],
      cities: [],
    }
  }

  getInitialStateErrors() {
    return {
      nameError: false,
      cpfError: false,
      emailError: false,
      postalCodeError: false
    }
  }

  componentDidMount() {
    (async () => {
      try {
        const states = await this.fetchStates()
        const cities = await this.fetchInitialCities()

        this.setState({states, cities})
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

  handlePostalCodeBlur = async () => {
    const resp = await ZipCodesAPI.fetchByPostalCode(this.state.postalCode)
    const zipCode = resp.data
    // console.log(zipCode)

    const city = zipCode.city

    this.setState({
      street: zipCode.street,
      region: zipCode.region,
      stateId: city.state.id,
      cityId: city.id,
      cities: [{ key: city.id, text: city.name, value: city.id }]
    })
  }

  handleSave = () => {
    if(!this.formHasFieldsWithErrors()) {
      this.props.onSave(this.getClient())
    }
  }

  formHasFieldsWithErrors() {
    let errors = {
      nameError: (this.state.name.trim() === ''),
      cpfError: (this.state.cpf.trim() === ''),
      emailError: (this.state.email.trim() === ''),
      postalCodeError: (this.state.postalCode.trim() === '')
    }

    this.setState({...errors})
    
    const fieldsWithErrors = Object.keys(errors)
      .filter(k => { return errors[k] === true })

    return fieldsWithErrors.length > 0
  }

  getClient = () => {
    const endereco = {
      cep: this.state.postalCode,
      rua : this.state.street,
      bairro : this.state.region,
      complemento : this.state.addressDescription,
      numero : this.state.addressNumber,

      cidade : {
        estado : {
          id_estado : this.state.stateId
        },
        id_cidade : this.state.cityId
      }
    }

    return {
      id: this.state.id,
      name: this.state.name,
      cpf: this.state.cpf,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      cellPhoneNumber: this.state.cellPhoneNumber,
      attributes: JSON.stringify({endereco})
    }
  }

  render() {
    const { states, cities } = this.state

    return (
      <Modal 
        size='large' dimmer
        open={this.props.open} 
        onClose={this.props.onClose}>
        <Modal.Header>{this.props.title}</Modal.Header>
        <Modal.Content scrolling>
          {/*JSON.stringify(this.state, null, 2)*/}

          <Form size='small'>
            <Form.Group widths='equal'>
              <Form.Field required error={this.state.nameError}>
                <label>Nome</label>
                <Input 
                  placeholder='Nome do Cliente' 
                  onChange={e => this.setState({name: e.target.value})}
                  value={this.state.name} />
              </Form.Field>

              <Form.Field required error={this.state.cpfError}>
                <label>CPF</label>
                <Input 
                  label='#' placeholder='999.999.999-99' 
                  onChange={e => this.setState({cpf: e.target.value})}
                  value={this.state.cpf} />
              </Form.Field>
            </Form.Group>

            <Form.Group widths='equal'>
              <Form.Field required error={this.state.emailError}>
                <label>Email</label>
                <Input 
                  label='@' placeholder='Email do Cliente'
                  onChange={e => this.setState({email: e.target.value})}
                  value={this.state.email} />
              </Form.Field>

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

            <Header size='medium'>Endereço do Cliente</Header>
            <Form.Group>
              <Form.Field width={4} required error={this.state.postalCodeError}>
                <label>CEP</label>
                <Input 
                  label='#' placeholder='99999-999'
                  onBlur={this.handlePostalCodeBlur}
                  onChange={e => this.setState({postalCode: e.target.value})}
                  value={this.state.postalCode} />
              </Form.Field>

              <Form.Input 
                label='Rua' placeholder='Rua' width={6}
                onChange={e => this.setState({ street: e.target.value })}
                value={this.state.street} />

              <Form.Input 
                label='Bairro' placeholder='Bairro' width={6}
                onChange={e => this.setState({ region: e.target.value })}
                value={this.state.region} />
            </Form.Group>

            <Form.Group>
              <Form.Input 
                label='Número' placeholder='0' width={4}
                onChange={e => this.setState({ addressNumber: e.target.value })}
                value={this.state.addressNumber} />

              <Form.Input 
                label='Complemento' placeholder='Complemento' width={6}
                onChange={e => this.setState({ addressDescription: e.target.value })}
                value={this.state.addressDescription} />
            </Form.Group>

            <Form.Group widths='equal'>
              <Form.Field>
                <label>Estado</label>
                <Select 
                  placeholder='Selecione o Estado'
                  search 
                  options={states}
                  onChange={this.handleStateChange} 
                  value={this.state.stateId} />
              </Form.Field>

              <Form.Field>
                <label>Cidade</label>
                <Select 
                  placeholder='Selecione a Cidade'
                  search 
                  options={cities}
                  onSearchChange={this.handleCityNameSearchChange}
                  onChange={(e, {value}) => this.setState({cityId: value})} 
                  value={this.state.cityId} />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.props.onClose}>Cancelar</Button>
          <Button color='blue' onClick={this.handleSave}>Salvar</Button>
        </Modal.Actions>
      </Modal>
    )
  }

}