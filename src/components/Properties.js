import React, { Component } from 'react'

import { Button, Divider, Image, Table, Icon } from 'semantic-ui-react'

import PropertiesSearchForm from './PropertiesSearchForm'
import PropertyCreateModal from './PropertyCreateModal'
import PropertyDeleteModal from './PropertyDeleteModal'

import PropertiesAPI from '../api/PropertiesAPI'

export default class Properties extends Component {

  state = {
    createModalVibible: false,
    editModalVisible: false,
    deleteModalVisible: false,

    properties: [],
    createProperty: { type: {}, state: {} }, 
    editProperty: null,
    deleteProperty: null,
  }

  componentDidMount() {
    (async () => {
      await this.fetchInitialProperties()

      this.setState({
        createProperty: this.getCreateProperty()
      })

    })();
  }

  fetchInitialProperties = async () => {
    const propertiesResp = await PropertiesAPI.fetchAll()
    const properties = propertiesResp.data.map((p) => ({ ...p, addressData: JSON.parse(p.addressData) }))

    this.setState({properties})
  }

  getCreateProperty() {
    return {
      id: null,
      imagePath: '',
      totalArea: '',
      bedrooms: '',
      bathrooms: '',
      garages: '',
      description: '',
      price: '',
      priceCondo: '',
      addressData: {},

      type: {id: null},
      state: {id: null},
    }
  }

  toggleCreateModalVisibility = () => this.setState({ createModalVibible: !this.state.createModalVibible })

  closeDeleteModal = () => {
    this.setState({
      deleteProperty: null, deleteModalVibible: false 
    })
  }

  handleFilter = async (params) => {
    try {
      const resp = await PropertiesAPI.fetchAllByParams(params)
      const properties = resp.data.map((p) => ({ ...p, addressData: JSON.parse(p.addressData) }))
      
      // console.log(properties)
      this.setState({properties})

    } catch(error) {
      console.log(error)
      this.setState({properties: []})
    }
  }

  renderAddressData = (property) => {
    if(!property.addressData.cidade) {
      return ''
    }

    let nome_cidade = property.addressData.cidade.nome_cidade
    let sigla_estado = property.addressData.cidade.estado.sigla_estado

    return `${nome_cidade} / ${sigla_estado}`
  }

  updateCreateProperty = (obj) => {
    this.setState({
      createProperty: {
        ...this.state.createProperty, 
        ...obj
      }
    })
  }

  showDeleteConfirmation = async (property, id) => {
    try {
      //const resp = await PropertiesAPI.fetchById(id)
      //const property = resp.data

      this.setState({ 
        deleteProperty: property, 
        deleteModalVisible: true 
      })

    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { properties } = this.state

    return (
      <div>
        <h1>Listagem de Imóveis</h1>

        <PropertiesSearchForm 
          fetchInitialProperties={this.fetchInitialProperties}
          toggleCreateModalVisibility={this.toggleCreateModalVisibility}
          onFilter={this.handleFilter}
        />

        <Divider />

        <Table celled striped compact size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Foto Principal</Table.HeaderCell>
              <Table.HeaderCell width={3}>Proprietário</Table.HeaderCell>
              <Table.HeaderCell width={2}>Tipo de Imóvel</Table.HeaderCell>
              <Table.HeaderCell width={2}>Situação Atual</Table.HeaderCell>
              <Table.HeaderCell>Cidade</Table.HeaderCell>
              <Table.HeaderCell width={2}>Preço</Table.HeaderCell>
              <Table.HeaderCell width={2}>Área(m²)</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          {
            properties.map(property => (
              <Table.Row key={property.id}>
                <Table.Cell><b>TODO: {property.imagePath}</b> <Image src='img/imovel01.jpg' size='small' /></Table.Cell>
                <Table.Cell><b>TODO:</b> owner</Table.Cell>
                <Table.Cell>{property.type.name}</Table.Cell>
                <Table.Cell>{property.state.name}</Table.Cell>
                <Table.Cell>{this.renderAddressData(property)}</Table.Cell>
                <Table.Cell>{property.price}</Table.Cell>
                <Table.Cell>{property.totalArea} m²</Table.Cell>

                <Table.Cell collapsing textAlign='left'>
                  <Button color='blue' size='small' icon>
                    <Icon name='edit' />
                  </Button>

                  <Button color='red' size='small' icon onClick={() => this.showDeleteConfirmation(property)}>
                    <Icon name='remove' />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          }
          </Table.Body>
        </Table>

        <PropertyCreateModal 
          createModalVibible={this.state.createModalVibible}
          toggleCreateModalVisibility={this.toggleCreateModalVisibility}
          property={this.state.createProperty}
          updateCreateProperty={this.updateCreateProperty}
          
        />

        {
          this.state.deleteProperty !== null && 
          <PropertyDeleteModal 
            deleteModalVisible={this.state.deleteModalVisible}
            closeDeleteModal={this.closeDeleteModal}
            property={this.state.deleteProperty}
          />
        }

      </div>
    )
  }

}