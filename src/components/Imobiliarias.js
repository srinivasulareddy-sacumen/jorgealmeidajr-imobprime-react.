import React, { Component } from 'react'

import { 
  Form, Input, Select, Button, 
  Divider, Header, Modal,
  Table, Icon, Image
} from 'semantic-ui-react'

import RealEstatesSearch from './RealEstatesSearch'
import RealEstateForm from './RealEstateForm'

import StatesAPI from '../api/StatesAPI'
import RealEstatesAPI from '../api/RealEstatesAPI'
import CitiesAPI from '../api/CitiesAPI'
import ZipCodesAPI from '../api/ZipCodesAPI'

export default class Imobiliarias extends Component {

  state = {
    createModalVibible: false,
    editModalVisible: false,
    deleteModalVisible: false,

    realEstate: null,

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
        if(response.status === 204) { // NO CONTENT
          this.setState({ realEstates: [] })
        } else { 
          this.setState({ realEstates: response.data })
        }
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

  toggleEditModalVisibility = () => this.setState({ editModalVisible: !this.state.editModalVisible })

  toggleDeleteModalVisibility = () => this.setState({ deleteModalVisible: !this.state.deleteModalVisible })

  handleFilter = (searchByName, searchByCNPJ, searchByState, searchByCity) => {
    RealEstatesAPI.filter(searchByName, searchByCNPJ, searchByState, searchByCity)
      .then((response) => {
        if(response.status === 204) { // NO CONTENT
          this.setState({ realEstates: [] })
        } else {
          this.setState({ realEstates: response.data })
        }
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

  save = () => {
    if(!this.realEstateCreateForm.formHasFieldsWithErrors()) {
      let data = this.realEstateCreateForm.getRealEstate()

      RealEstatesAPI.save(data)
        .then((response) => {
          const params = this.realEstatesSearch.getSearchParams()
          this.handleFilter(params.searchByName, params.searchByCNPJ, params.searchByState, params.searchByCity)
          this.toggleCreateModalVisibility()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  clearCreateForm = () => {
    this.realEstateCreateForm.resetForm()
  }

  showEditForm = (id) => {
    RealEstatesAPI.fetchById(id)
      .then((response) => {
        this.setState({ realEstate: response.data, editModalVisible: true })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  showDeleteConfirmation = (id) => {
    RealEstatesAPI.fetchById(id)
      .then((response) => {
        this.setState({ realEstate: response.data, deleteModalVisible: true })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  clearEditForm = () => {
    this.realEstateEditForm.resetForm()
  }

  update = () => {
    if(!this.realEstateEditForm.formHasFieldsWithErrors()) {
      let data = this.realEstateEditForm.getRealEstate()
      
      RealEstatesAPI.update(data)
        .then((response) => {
          const params = this.realEstatesSearch.getSearchParams()
          this.handleFilter(params.searchByName, params.searchByCNPJ, params.searchByState, params.searchByCity)
          this.toggleEditModalVisibility()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  delete = () => {
    RealEstatesAPI.delete(this.state.realEstate.id)
      .then((resp) => {
        const params = this.realEstatesSearch.getSearchParams()
        this.handleFilter(params.searchByName, params.searchByCNPJ, params.searchByState, params.searchByCity)
        this.toggleDeleteModalVisibility()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  fetchZipCodeByPostalCode = (postalCode) => {
    return ZipCodesAPI.fetchByPostalCode(postalCode)
  }

  fetchZipCodeWithViaCep = (postalCode) => {
    postalCode = postalCode.replace(/-/g, '')
    return ZipCodesAPI.fetchWithViaCep(postalCode)
  }

  render() {
    const { states, realEstates } = this.state

    return (
      <div>
        <h1>Listagem de Imobili??rias</h1>

        <RealEstatesSearch 
          ref={input => this.realEstatesSearch = input}
          states={states} 
          fetchInitialRealEstatesPage={this.fetchInitialRealEstatesPage}
          fetchCities={this.fetchCities}
          onFilter={this.handleFilter}
          toggleCreateModalVisibility={this.toggleCreateModalVisibility} />

        <Divider />

        <Table celled striped compact size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2}>Logo</Table.HeaderCell>
              <Table.HeaderCell width={4}>Raz??o Social</Table.HeaderCell>
              <Table.HeaderCell width={2}>CNPJ</Table.HeaderCell>
              <Table.HeaderCell width={2}>COFECI</Table.HeaderCell>
              <Table.HeaderCell>Cidade da Sede</Table.HeaderCell>
              <Table.HeaderCell>A????es</Table.HeaderCell>
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
                    <Button color='blue' size='small' icon onClick={() => this.showEditForm(r.id)}>
                      <Icon name='edit' />
                    </Button>
                    <Button color='red' size='small' icon onClick={() => this.showDeleteConfirmation(r.id)}>
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
          onClose={this.toggleCreateModalVisibility}>
          <Modal.Header>Cadastro de uma nova Imobili??ria</Modal.Header>
          <Modal.Content scrolling>
            <RealEstateForm 
              states={states} 
              fetchCities={this.fetchCities}
              fetchZipCodeByPostalCode={this.fetchZipCodeByPostalCode}
              fetchZipCodeWithViaCep={this.fetchZipCodeWithViaCep}
              ref={e => this.realEstateCreateForm = e} />
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={this.toggleCreateModalVisibility}>Cancelar</Button>
            <Button color='blue' onClick={this.clearCreateForm}>Limpar</Button>
            <Button color='blue' onClick={this.save}>Salvar</Button>
          </Modal.Actions>
        </Modal>

        <Modal 
          size='large' dimmer
          open={this.state.editModalVisible} 
          onClose={this.toggleEditModalVisibility}>
          <Modal.Header>Edi????o de Imobili??ria</Modal.Header>
          <Modal.Content scrolling>
            <RealEstateForm 
              realEstate={this.state.realEstate}
              states={states} 
              fetchCities={this.fetchCities}
              fetchZipCodeByPostalCode={this.fetchZipCodeByPostalCode}
              fetchZipCodeWithViaCep={this.fetchZipCodeWithViaCep}
              ref={e => this.realEstateEditForm = e} />
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={this.toggleEditModalVisibility}>Cancelar</Button>
            <Button color='blue' onClick={this.clearEditForm}>Limpar</Button>
            <Button color='blue' onClick={this.update}>Salvar</Button>
          </Modal.Actions>
        </Modal>

        <Modal 
          size='small' dimmer
          open={this.state.deleteModalVisible} 
          onClose={this.toggleDeleteModalVisibility}>
          <Modal.Header>Confirmar Remo????o de Imobili??ria</Modal.Header>
          <Modal.Content>
            {
              this.state.realEstate !== null &&
              <Header as='h4' dividing>
                Deseja mesmo remover a imobili??ria({this.state.realEstate.name}) selecionada ?
              </Header>
            }
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.toggleDeleteModalVisibility}>N??o</Button>
            <Button color='red' onClick={this.delete}>Sim</Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }

}