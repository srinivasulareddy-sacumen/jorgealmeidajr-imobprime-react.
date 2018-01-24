
import React, { Component } from 'react'

import { Form, Input, Select, Divider, Header, Button, Modal } from 'semantic-ui-react'

import StatesAPI from '../api/StatesAPI'
import CitiesAPI from '../api/CitiesAPI'

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
      state: {id: null},
      city: {id: null},
      
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
                  label='#' placeholder='99.999-999'
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
              <Form.Select label='Estado' placeholder='Estado' search options={states} />
              <Form.Select label='Cidade' placeholder='Cidade' search options={cities} />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.props.onClose}>Cancelar</Button>
          <Button color='blue' onClick={this.props.onClose}>Salvar</Button>
        </Modal.Actions>
      </Modal>
    )
  }

}