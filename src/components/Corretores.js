import React, { Component } from 'react'

import { 
  Form, Button, 
  Divider,
  Table, Icon
} from 'semantic-ui-react'

export default class Corretores extends Component {

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

          <Form.Group widths='equal'>
            <Form.Input label='Estado' placeholder='Estado de atuação do Corretor' />
            <Form.Input label='Cidade' placeholder='Cidade de atuação do Corretor' />
          </Form.Group>

          <Button color='blue' size='small' style={{width: 90}}>Buscar</Button>
          <Button color='blue' size='small' style={{width: 90}}>Limpar</Button>
          <Button color='green' size='small' style={{width: 90}}>Adicionar</Button>
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

      </div>
    )
  }

}