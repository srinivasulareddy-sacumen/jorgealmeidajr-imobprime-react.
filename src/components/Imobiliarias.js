import React, { Component } from 'react'

import { 
  Form, Button, 
  Divider,
  Table, Icon
} from 'semantic-ui-react'

export default class Imobiliarias extends Component {

  render() {
    return (
      <div>
        <h1>Listagem de Imobiliárias</h1>

        <Form size='small'>
          <Form.Group widths='equal'>
            <Form.Input label='Razão Social' placeholder='Razão Social da Imobiliária' />
            <Form.Input label='CNPJ' placeholder='CNPJ da Imobiliária' />
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Input label='Estado' placeholder='Estado' />
            <Form.Input label='Cidade' placeholder='Cidade do endereço da Imobiliária' />
          </Form.Group>

          <Button color='blue' size='small' style={{width: 90}}>Buscar</Button>
          <Button color='blue' size='small' style={{width: 90}}>Limpar</Button>
          <Button color='green' size='small' style={{width: 90}}>Adicionar</Button>
        </Form>

        <Divider />

        <Table celled striped compact size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Razão Social</Table.HeaderCell>
              <Table.HeaderCell width={2}>CNPJ</Table.HeaderCell>
              <Table.HeaderCell>Cidade da Sede</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>IBagy</Table.Cell>
              <Table.Cell>111.111.111-11</Table.Cell>
              <Table.Cell>Florianopolis/SC</Table.Cell>
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