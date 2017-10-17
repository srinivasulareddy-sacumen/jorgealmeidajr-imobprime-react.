import React, { Component } from 'react'

import { 
  Form, Button, 
  Divider, Modal,
  Table, Icon
} from 'semantic-ui-react'

export default class Corretores extends Component {

  state = {
    createModalVibible: false
  }

  toggleCreateModalVisibility = () => this.setState({ createModalVibible: !this.state.createModalVibible })

  render() {
    return (
      <div>
        <h1>Listagem de Corretores</h1>

        <Form size='small'>
          <Form.Group widths='equal'>
            <Form.Input label='Nome' placeholder='Nome do Corretor' />
            <Form.Input label='CPF' placeholder='CPF do Corretor' width={4} />
            <Form.Input label='CRECI' placeholder='Registro CRECI do Corretor' width={4} />
          </Form.Group>

          <Form.Input label='Imobiliária' placeholder='Imobiliária' />

          <Form.Group widths='equal'>
            <Form.Input label='Estado' placeholder='Estado de atuação do Corretor' />
            <Form.Input label='Cidade' placeholder='Cidade de atuação do Corretor' />
          </Form.Group>

          <Button color='blue' size='small' style={{width: 90}}>Buscar</Button>
          <Button color='blue' size='small' style={{width: 90}}>Limpar</Button>
          <Button color='green' size='small' style={{width: 90}} onClick={this.toggleCreateModalVisibility}>Adicionar</Button>
        </Form>

        <Divider />

        <Table celled striped compact size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3}>Nome</Table.HeaderCell>
              <Table.HeaderCell width={2}>CPF</Table.HeaderCell>
              <Table.HeaderCell width={1}>CRECI</Table.HeaderCell>
              <Table.HeaderCell>Cidade</Table.HeaderCell>
              <Table.HeaderCell width={2}>Telefone</Table.HeaderCell>
              <Table.HeaderCell width={2}>Celular</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Maria</Table.Cell>
              <Table.Cell>333.333.333-33</Table.Cell>
              <Table.Cell>1500</Table.Cell>
              <Table.Cell>Florianopolis/SC</Table.Cell>
              <Table.Cell>48 3232 3232</Table.Cell>
              <Table.Cell>48 93232 3232</Table.Cell>
              <Table.Cell>maria@gmail.com</Table.Cell>
              <Table.Cell collapsing textAlign='left'>
                <Button color='blue' size='small' icon>
                  <Icon name='edit' />
                </Button>
                <Button color='red' size='small' icon>
                  <Icon name='remove' />
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Modal 
          size='large' dimmer
          open={this.state.createModalVibible} 
          onClose={this.toggleCreateModalVisibility}
        >
          <Modal.Header>Cadastro de um novo Corretor</Modal.Header>
          <Modal.Content scrolling>
            <Form size='small'>
              <Form.Input label='Imobiliária' placeholder='Imobiliária' />
              <Form.Group widths='equal'>
                <Form.Input label='Nome' placeholder='Nome do Corretor' />
                <Form.Input label='CPF' placeholder='CPF do Corretor' />
                <Form.Input label='CRECI' placeholder='Registro do CRECI do Corretor' />
              </Form.Group>
              <Form.Input label='Email' placeholder='Email do Corretor' />
              <Form.Input label='Site' placeholder='Site do Corretor' />
              <Form.Group widths='equal'>
                <Form.Input label='Telefone' placeholder='Telefone do Corretor' />
                <Form.Input label='Celular' placeholder='Celular do Corretor' />
              </Form.Group>
              <Divider />
              <Form.Group widths='equal'>
                <Form.Input label='Estado' placeholder='Estado de atuação' />
                <Form.Input label='Cidade' placeholder='Cidade de atuação' />
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