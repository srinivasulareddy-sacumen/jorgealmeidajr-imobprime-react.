import React, { Component } from 'react'

import { 
  Form, Input, Button, 
  Divider, Modal,
  Table, Icon
} from 'semantic-ui-react'

import AgentsSearch from './AgentsSearch'

import AgentsAPI from '../api/AgentsAPI'
import StatesAPI from '../api/StatesAPI'
import CitiesAPI from '../api/CitiesAPI'
import RealEstatesAPI from '../api/RealEstatesAPI'

export default class Agents extends Component {

  state = {
    createModalVibible: false,
    editModalVisible: false,
    deleteModalVisible: false,

    agents: []
  }

  componentDidMount() {
    AgentsAPI.fetchAll()
      .then((resp) => this.setState({agents: resp.data}))
      .catch((error) => console.log(error))
  }

  toggleCreateModalVisibility = () => this.setState({ createModalVibible: !this.state.createModalVibible })

  handleFilter = (params) => {
    AgentsAPI.fetchAllByParams(params)
      .then((resp) => this.setState({agents: resp.data}))
      .catch((error) => console.log(error))
  }

  render() {
    const { agents } = this.state

    return (
      <div>
        <h1>Listagem de Corretores</h1>

        <AgentsSearch 
          ref={input => this.agentsSearch = input}
          onFilter={this.handleFilter}
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
          onClose={this.toggleCreateModalVisibility}>
          <Modal.Header>Cadastro de um novo Corretor</Modal.Header>
          <Modal.Content scrolling>
            <Form size='small'>
              <Form.Group widths='equal'>
                <Form.Select label='Imobiliária' placeholder='Imobiliária' search options={[]} required error />
                <Form.Input label='Nome' placeholder='Nome do Corretor' required error />
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Field required error>
                  <label>CPF</label>
                  <Input label='#' placeholder='999.999.999-99' />
                </Form.Field>

                <Form.Input label='CRECI' placeholder='0' required error />
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Field required error>
                  <label>Email</label>
                  <Input label='@' placeholder='Email do Corretor' />
                </Form.Field>

                <Form.Field>
                  <label>Site</label>
                  <Input label='http://' placeholder='Site do Corretor' />
                </Form.Field>
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Field>
                  <label>Telefone</label>
                  <Input label='#' placeholder='(99) 9999-9999' />
                </Form.Field>

                <Form.Field>
                  <label>Celular</label>
                  <Input label='#' placeholder='(99) 99999-9999' />
                </Form.Field>
              </Form.Group>

              <Divider />

              <Form.Group widths='equal'>
                <Form.Select label='Estado' placeholder='Estado de atuação' search options={[]} required error />
                <Form.Select label='Cidade' placeholder='Cidade de atuação' search options={[]} />
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