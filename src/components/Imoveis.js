import React, { Component } from 'react'

import { 
  Form, Button, 
  Divider,
  Table, Icon
} from 'semantic-ui-react'

import ImoveisAPI from '../api/ImoveisAPI'
import CidadesAPI from '../api/CidadesAPI'

export default class Imoveis extends Component {

  state = {
    tiposImovel: [],
    situacoesImovel: [],
    cidades: [],
    estados: []
  }

  componentDidMount() {
    const tiposImovel = ImoveisAPI.getTiposImovel()
      .map((tipo) => ({ key: tipo.id, text: tipo.nome, value: tipo.id }))

    const situacoesImovel = ImoveisAPI.getSituaçoesImovel()
      .map((situacao) => ({ key: situacao.id, text: situacao.nome, value: situacao.id }))

    const cidades = CidadesAPI.getCidades()
      .map((c) => ({ key: c.id, text: c.nome, value: c.id }))

    const estados = CidadesAPI.getEstados()
      .map((e) => ({ key: e.id, text: e.nome, value: e.id }))

    this.setState({ tiposImovel, situacoesImovel, cidades, estados })
  }

  render() {
    const { tiposImovel, situacoesImovel, cidades, estados } = this.state

    return (
      <div>
        <h1>Listagem de Imóveis</h1>

        <Form size='small'>
          <Form.Group widths='equal'>
            <Form.Input label='Proprietário' placeholder='Nome do proprietátio do Imóvel' />
            <Form.Select label='Tipo de Imóvel' placeholder='Selecione o Tipo de Imóvel' options={tiposImovel} />
            <Form.Select label='Situação do Imóvel' placeholder='Selecione a Situação do Imóvel' options={situacoesImovel} />
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Select label='Cidade' placeholder='Selecione a Cidade do Imóvel' options={cidades} />
            <Form.Select label='Estado' placeholder='Selecione a Estado do Imóvel' options={estados} />
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Input label='Preço inicial' placeholder='Preço inicial do Imóvel' />
            <Form.Input label='Preço limite' placeholder='Preço limite do Imóvel' />
            <Form.Input label='Área inicial' placeholder='Área inicial em m² do Imóvel' />
            <Form.Input label='Área limite' placeholder='Área limite em m² do Imóvel' />
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
              <Table.HeaderCell width={2}>Área(m²)</Table.HeaderCell>
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