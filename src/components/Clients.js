import React, { Component } from 'react'

import { Form, Input, Button, Divider, Header, Table, Icon, Modal } from 'semantic-ui-react'

import ClientsSearchForm from './ClientsSearchForm'

import ClientsAPI from '../api/ClientsAPI'
import CitiesAPI from '../api/CitiesAPI'

export default class Clients extends Component {

  state = {
    createModalVibible: false,
    editModalVisible: false,
    deleteModalVisible: false,

    client: null,
    clients: [],

    estados: [],
    cidades: []
  }

  componentDidMount() {
    const estados = CitiesAPI.getEstados()
      .map((e) => ({ key: e.id, text: e.nome, value: e.id }))

    const cidades = CitiesAPI.getCidades()
      .map((e) => ({ key: e.id, text: e.nome, value: e.id }))

    this.setState({ estados, cidades });

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

  render() {
    const { estados, cidades, clients } = this.state

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
                    <Button color='blue' size='small' icon>
                      <Icon name='edit' />
                    </Button>
                    <Button color='red' size='small' icon>
                      <Icon name='remove' />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              )
            })
          }
          </Table.Body>
        </Table>

        <Modal 
          size='large' dimmer
          open={this.state.createModalVibible} 
          onClose={this.toggleCreateModalVisibility}
        >
          <Modal.Header>Cadastro de um novo Cliente</Modal.Header>
          <Modal.Content scrolling>
            <Form size='small'>
              <Form.Group widths='equal'>
                <Form.Input label='Nome' placeholder='Nome do Cliente' required error />
                
                <Form.Field required error>
                  <label>CPF</label>
                  <Input label='#' placeholder='999.999.999-99' />
                </Form.Field>
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Field required error>
                  <label>Email</label>
                  <Input label='@' placeholder='Email do Cliente' />
                </Form.Field>

                <Form.Field>
                  <label>Celular</label>
                  <Input label='#' placeholder='(99) 99999-9999' />
                </Form.Field>

                <Form.Field>
                  <label>Telefone</label>
                  <Input label='#' placeholder='(99) 9999-9999' />
                </Form.Field>
              </Form.Group>

              <Divider />

              <Header size='medium'>Endereço do Cliente</Header>
              <Form.Group>
                <Form.Field width={4} required error>
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
                <Form.Select label='Estado' placeholder='Estado' search options={estados} />
                <Form.Select label='Cidade' placeholder='Cidade' search options={cidades} />
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