import React, { Component } from 'react'

import { 
  Form, Input, Select, Button, 
  Divider, Header, Modal,
  Table, Icon, Image
} from 'semantic-ui-react'

import RealEstatesSearch from './RealEstatesSearch'

import StatesAPI from '../api/StatesAPI'
import RealEstatesAPI from '../api/RealEstatesAPI'
import CitiesAPI from '../api/CitiesAPI'

export default class Imobiliarias extends Component {

  state = {
    searchByName: '',
    searchByCNPJ: '',
    searchByState: null,
    searchByCity: null,

    createModalVibible: false,
    states: [],
    cities: [],
    realEstates: []
  }

  componentDidMount() {
    this.init()
    this.fetchInitialRealEstatesPage()
  }

  fetchInitialRealEstatesPage = () => {
    RealEstatesAPI.fetchAll()
      .then((response) => {
        this.setState({ realEstates: response.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async init() {
    try {
      const statesData = await StatesAPI.fetchAll()
      const states = statesData.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))

      const citiesData = await CitiesAPI.fetchAll()
      const cities = citiesData.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))

      this.setState({ states, cities })
    } catch(error) {
      console.log(error)
    }
  }

  // handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  handleSelectChange = (name, value) => this.setState({ [name]: value })

  toggleCreateModalVisibility = () => this.setState({ createModalVibible: !this.state.createModalVibible })

  handleFilter = (searchByName, searchByCNPJ, searchByState, searchByCity) => {
    console.log(searchByName, searchByCNPJ, searchByState, searchByCity)

    RealEstatesAPI.filter(searchByName, searchByCNPJ, searchByState, searchByCity)
      .then((response) => {
        this.setState({ realEstates: response.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  fetchCities = async (name, stateId) => {
    let cities = []
    try {
        cities = await CitiesAPI.filter(name, stateId)
    } catch(error) {
      console.log(error)
    }
    return cities
  }

  render() {
    const { states, cities, realEstates } = this.state

    return (
      <div>
        <h1>Listagem de Imobiliárias</h1>

        <RealEstatesSearch 
          states={states} 
          fetchInitialRealEstatesPage={this.fetchInitialRealEstatesPage}
          fetchCities={this.fetchCities}
          onFilter={this.handleFilter} />

        <Divider />

        <Table celled striped compact size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2}>Logo</Table.HeaderCell>
              <Table.HeaderCell width={4}>Razão Social</Table.HeaderCell>
              <Table.HeaderCell width={2}>CNPJ</Table.HeaderCell>
              <Table.HeaderCell width={2}>COFECI</Table.HeaderCell>
              <Table.HeaderCell>Cidade da Sede</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {realEstates.map(r => {
              return (
                <Table.Row key={r.id}>
                  <Table.Cell><Image src='img/ibagy-logo.png' size='tiny' /> / {r.logoImagePath}</Table.Cell>
                  <Table.Cell>{r.name}</Table.Cell>
                  <Table.Cell>{r.cnpj}</Table.Cell>
                  <Table.Cell>{r.cofeci}</Table.Cell>
                  <Table.Cell>{r.addressZipCode.city.name} / {r.addressZipCode.city.state.stateAbbreviation}</Table.Cell>
                  <Table.Cell collapsing textAlign='left'>
                    <Button color='blue' size='small' icon>
                      <Icon name='edit' />
                    </Button>
                    <Button color='red' size='small' icon>
                      <Icon name='remove' />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>

        <Modal 
          size='large' dimmer
          open={this.state.createModalVibible} 
          onClose={this.toggleCreateModalVisibility}
        >
          <Modal.Header>Cadastro de uma nova Imobiliária</Modal.Header>
          <Modal.Content scrolling>
            <Form size='small'>
              <Form.Group widths='equal'>
                <Form.Input required error label='Razão Social' placeholder='Razão Social da Imobiliária' />
                
                <Form.Field required error>
                  <label>CNPJ</label>
                  <Input label='#' placeholder='99.999.999/9999-99' />
                </Form.Field>

                <Form.Field required error>
                  <label>COFECI</label>
                  <Input placeholder='0' />
                </Form.Field>
              </Form.Group>

              <Form.Input type="file" label='Logo da Imobiliária' />

              <Divider />

              <Header size='medium'>Endereço da sede</Header>
              <Form.Group>
                <Form.Field required width={4} error>
                  <label>CEP</label>
                  <Input label='#' placeholder='99.999-999' />
                </Form.Field>

                <Form.Input label='Rua' placeholder='Rua' width={6} />
                <Form.Input label='Bairro' placeholder='Bairro' width={6} />
              </Form.Group>

              <Form.Group>
                <Form.Input label='Número' placeholder='0' width={4} />
                <Form.Input label='Complemento' placeholder='Complemento' width={6} />
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Select label='Estado' placeholder='Estado' search options={states} />
                <Form.Select label='Cidade' placeholder='Cidade' search options={cities} />
              </Form.Group>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={this.toggleCreateModalVisibility}>Cancelar</Button>
            <Button color='blue' onClick={this.toggleCreateModalVisibility}>Salvar</Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }

}