import React, { Component } from 'react'

import { Form, Button, Divider, Modal, Table, Icon } from 'semantic-ui-react'

import AgentsSearch from './AgentsSearch'
import AgentForm from './AgentForm'

import AgentsAPI from '../api/AgentsAPI'

export default class Agents extends Component {

  state = {
    createModalVibible: false,
    editModalVisible: false,
    deleteModalVisible: false,

    agent: null,
    agents: []
  }

  componentDidMount() {
    this.fetchInitialAgents()
  }

  fetchInitialAgents = () => {
    AgentsAPI.fetchAll()
      .then((resp) => this.setState({agents: resp.data}))
      .catch((error) => console.log(error))
  }

  toggleCreateModalVisibility = () => this.setState({ createModalVibible: !this.state.createModalVibible })

  toggleEditModalVisibility = () => this.setState({ editModalVisible: !this.state.editModalVisible })

  handleFilter = (params) => {
    AgentsAPI.fetchAllByParams(params)
      .then((resp) => this.setState({agents: resp.data}))
      .catch((error) => {
        console.log(error)
        this.setState({agents: []})
      })
  }

  save = () => {
    if(!this.createForm.formHasFieldsWithErrors()) {
      let data = this.createForm.getAgent()

      AgentsAPI.save(data)
        .then((response) => {
          const params = this.searchForm.getSearchParams()
          this.handleFilter(params)
          this.toggleCreateModalVisibility()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  showEditForm = (id) => {
    AgentsAPI.fetchById(id)
      .then((response) => {
        this.setState({ agent: response.data, editModalVisible: true })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ agent: null, editModalVisible: false })
      })
  }

  render() {
    const { agents } = this.state

    return (
      <div>
        <h1>Listagem de Corretores</h1>

        <AgentsSearch 
          ref={e => this.searchForm = e}
          fetchInitialAgents={this.fetchInitialAgents}
          onFilter={this.handleFilter}
          toggleCreateModalVisibility={this.toggleCreateModalVisibility}
        />

        <Divider />

        <Table celled striped compact size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2}>Nome</Table.HeaderCell>
              <Table.HeaderCell width={2}>CPF</Table.HeaderCell>
              <Table.HeaderCell width={1}>CRECI</Table.HeaderCell>
              <Table.HeaderCell>Cidade</Table.HeaderCell>
              <Table.HeaderCell width={2}>Telefone</Table.HeaderCell>
              <Table.HeaderCell width={2}>Celular</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell width={1}>Ativo</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          {
            agents.map(a => {
              return (
                <Table.Row key={a.id}>
                  <Table.Cell>{a.name}</Table.Cell>
                  <Table.Cell>{a.cpf}</Table.Cell>
                  <Table.Cell>{a.creci}</Table.Cell>
                  <Table.Cell>{a.city && a.city.name} / {a.state.stateAbbreviation}</Table.Cell>
                  <Table.Cell>{a.phoneNumber}</Table.Cell>
                  <Table.Cell>{a.cellPhoneNumber}</Table.Cell>
                  <Table.Cell>{a.email}</Table.Cell>

                  <Table.Cell>
                    <Form.Radio label='Sim' value='yes' checked />
                    <Form.Radio label='Não' value='no' />
                  </Table.Cell>

                  <Table.Cell collapsing textAlign='left'>
                    <Button color='blue' size='small' icon onClick={() => this.showEditForm(a.id)}>
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
          onClose={this.toggleCreateModalVisibility}>
          <Modal.Header>Cadastro de um novo Corretor</Modal.Header>
          <Modal.Content scrolling>            
            <AgentForm 
              ref={e => this.createForm = e} 
            />
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={this.toggleCreateModalVisibility}>Cancelar</Button>
            <Button color='blue' onClick={this.save}>Salvar</Button>
          </Modal.Actions>
        </Modal>

        <Modal 
          size='large' dimmer
          open={this.state.editModalVisible} 
          onClose={this.toggleEditModalVisibility}>
          <Modal.Header>Edição de Corretor</Modal.Header>
          <Modal.Content scrolling>
            <AgentForm 
              ref={e => this.editForm = e}
              agent={this.state.agent} 
            />
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={this.toggleEditModalVisibility}>Cancelar</Button>
            <Button color='blue' onClick={this.update}>Salvar</Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }

}