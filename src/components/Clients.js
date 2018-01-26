import React, { Component } from 'react'

import { Button, Divider, Table, Icon, Modal, Header } from 'semantic-ui-react'

import ClientsSearchForm from './ClientsSearchForm'
import ClientFormModal from './ClientFormModal'

import ClientsAPI from '../api/ClientsAPI'

export default class Clients extends Component {

  state = {
    createModalVibible: false,
    editModalVisible: false,
    deleteModalVisible: false,

    client: null,
    clients: []
  }

  componentDidMount() {
    (async () => {
      try {
        this.fetchInitialClients()
      } catch(error) {
        console.log(error)
      }
    })();
  }

  fetchInitialClients = async () => {
    const resp = await ClientsAPI.fetchAll()
    
    const clients = resp.data.map((client) => ({ ...client, attributes: JSON.parse(client.attributes) }))
    // console.log(clients)

    this.setState({clients})
  }

  toggleCreateModalVisibility = () => this.setState({ createModalVibible: !this.state.createModalVibible })

  toggleEditModalVisibility = () => this.setState({ editModalVisible: !this.state.editModalVisible })

  toggleDeleteModalVisibility = () => this.setState({ deleteModalVisible: !this.state.deleteModalVisible })

  getCityStr = (client) => {
    const endereco = client.attributes.endereco

    if(endereco === undefined)
      return ''

    return `${endereco.cidade.nome_cidade} / ${endereco.cidade.estado.sigla_estado}`
  }

  handleFilter = async (params) => {
    try {
      const resp = await ClientsAPI.fetchAllByParams(params)
      const clients = resp.data.map((client) => ({ ...client, attributes: JSON.parse(client.attributes) }))
      
      // console.log(clients)
      this.setState({clients})
    } catch(error) {
      console.log(error)
      this.setState({clients: []})
    }
  }

  save = async (client) => {
    try {
      if(client.id === null) {
        await ClientsAPI.save(client)
      } else {
        await ClientsAPI.update(client)
      }
      
      const params = this.searchForm.getSearchParams()
      await this.handleFilter(params)

      if(client.id === null) {
        this.toggleCreateModalVisibility()
      } else {
        this.toggleEditModalVisibility()
      }
    } catch(error) {
      console.log(error)
    }
  }

  showEditForm = async (id) => {
    try {
      const resp = await ClientsAPI.fetchById(id)

      const attributes = JSON.parse(resp.data.attributes)
      const client = { ...resp.data, attributes }

      this.setState({ client })

      await this.editModal.setClient(client)

      this.toggleEditModalVisibility()
    } catch(error) {
      console.log(error)
    }
  }

  showDeleteConfirmation = async (id) => {
    try {
      const resp = await ClientsAPI.fetchById(id)
      const client = resp.data

      this.setState({ client, deleteModalVisible: true })
    } catch(error) {
      console.log(error)
    }
  }

  delete = async () => {
    try {
      await ClientsAPI.delete(this.state.client.id)

      const params = this.searchForm.getSearchParams()
      await this.handleFilter(params)

      this.toggleDeleteModalVisibility()
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { clients } = this.state

    return (
      <div>
        <h1>Listagem de Clientes</h1>

        <ClientsSearchForm 
          ref={e => this.searchForm = e}
          fetchInitialClients={this.fetchInitialClients}
          onFilter={this.handleFilter}
          toggleCreateModalVisibility={this.toggleCreateModalVisibility}
        />

        <Divider />

        <Table celled striped compact size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell width={2}>CPF</Table.HeaderCell>
              <Table.HeaderCell>Cidade</Table.HeaderCell>
              <Table.HeaderCell>Telefone</Table.HeaderCell>
              <Table.HeaderCell>Celular</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          {
            clients.map(client => {
              return (
                <Table.Row key={client.id}>
                  <Table.Cell>{client.name}</Table.Cell>
                  <Table.Cell>{client.cpf}</Table.Cell>
                  <Table.Cell>{this.getCityStr(client)}</Table.Cell>
                  <Table.Cell>{client.phoneNumber}</Table.Cell>
                  <Table.Cell>{client.cellPhoneNumber}</Table.Cell>
                  <Table.Cell>{client.email}</Table.Cell>
                  <Table.Cell collapsing textAlign='left'>
                    <Button color='blue' size='small' icon onClick={() => this.showEditForm(client.id)}>
                      <Icon name='edit' />
                    </Button>
                    <Button color='red' size='small' icon onClick={() => this.showDeleteConfirmation(client.id)}>
                      <Icon name='remove' />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              )
            })
          }
          </Table.Body>
        </Table>

        <ClientFormModal 
          title='Cadastro de um novo Cliente'
          open={this.state.createModalVibible}
          onClose={this.toggleCreateModalVisibility}
          onSave={this.save}
        />

        <ClientFormModal 
          ref={e => this.editModal = e}
          title='Edição de um Cliente'
          open={this.state.editModalVisible}
          onClose={this.toggleEditModalVisibility}
          
          onSave={this.save}
        />

        <Modal 
          size='small' dimmer
          open={this.state.deleteModalVisible} 
          onClose={this.toggleDeleteModalVisibility}>
          <Modal.Header>Confirmar Remoção do Cliente</Modal.Header>
          <Modal.Content>
            {
              this.state.client !== null &&
              <Header as='h4' dividing>
                Deseja mesmo remover o Cliente ({this.state.client.name}) selecionado ?
              </Header>
            }
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.toggleDeleteModalVisibility}>Não</Button>
            <Button color='red' onClick={this.delete}>Sim</Button>
          </Modal.Actions>
        </Modal>

      </div>
    )
  }

}