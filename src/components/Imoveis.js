import React, { Component } from 'react'

import { 
  Form, Button, 
  Divider,
  Table, Icon
} from 'semantic-ui-react'

export default class Imoveis extends Component {

  render() {
    return (
      <div>
        <h1>Listagem de Imóveis</h1>

        <Form size='small'>
          <Form.Group widths='equal'>
            <Form.Input label='Proprietário' placeholder='Nome do proprietátio do Imóvel' />
            <Form.Input label='Tipo do Imóvel' placeholder='Selecione o Tipo do Imóvel... casa apartamento' />
            <Form.Input label='Situação do Imóvel' placeholder='Selecione a Situação do Imóvel... compra venda construção' />
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Input label='Cidade' placeholder='Selecione a Cidade do Imóvel' />
            <Form.Input label='Estado' placeholder='Selecione a Estado do Imóvel' />
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Input label='Preço inicial' placeholder='Preço inicial do Imóvel' />
            <Form.Input label='Preço limite' placeholder='Preço limite do Imóvel' />
            <Form.Input label='Área inicial' placeholder='Área inicial em m2 do Imóvel' />
            <Form.Input label='Área limite' placeholder='Área limite em m2 do Imóvel' />
          </Form.Group>

          <Button color='blue' size='small' style={{width: 90}}>Buscar</Button>
          <Button color='blue' size='small' style={{width: 90}}>Limpar</Button>
          <Button color='green' size='small' style={{width: 90}}>Adicionar</Button>
        </Form>

        <Divider />

        <Table celled striped compact size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Foto</Table.HeaderCell>
              <Table.HeaderCell width={3}>Proprietário</Table.HeaderCell>
              <Table.HeaderCell width={2}>Tipo de Imóvel</Table.HeaderCell>
              <Table.HeaderCell width={2}>Situação Atual</Table.HeaderCell>
              <Table.HeaderCell>Cidade</Table.HeaderCell>
              <Table.HeaderCell width={2}>Preço</Table.HeaderCell>
              <Table.HeaderCell width={2}>Área(m2)</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell>Maria</Table.Cell>
              <Table.Cell>Casa</Table.Cell>
              <Table.Cell>Venda</Table.Cell>
              <Table.Cell>Florianopolis/SC</Table.Cell>
              <Table.Cell>250.000</Table.Cell>
              <Table.Cell>100</Table.Cell>
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