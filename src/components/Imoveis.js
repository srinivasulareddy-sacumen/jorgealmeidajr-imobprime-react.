import React, { Component } from 'react'

import { 
  Form, Button, 
  Divider, Modal, Header, Image,
  Table, Icon
} from 'semantic-ui-react'

import ImoveisAPI from '../api/ImoveisAPI'
import CidadesAPI from '../api/CidadesAPI'

export default class Imoveis extends Component {

  state = {
    tiposImovel: [],
    situacoesImovel: [],
    cidades: [],
    estados: [],
    createModalVibible: false
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

  toggleCreateModalVisibility = () => this.setState({ createModalVibible: !this.state.createModalVibible })

  render() {
    const { tiposImovel, situacoesImovel, cidades, estados } = this.state

    return (
      <div>
        <h1>Listagem de Imóveis</h1>

        <Form size='small'>
          <Form.Group widths='equal'>
            <Form.Select label='Proprietário' search placeholder='Nome do proprietátio do Imóvel' />
            <Form.Select label='Tipo de Imóvel' placeholder='Selecione o Tipo de Imóvel' options={tiposImovel} />
            <Form.Select label='Situação do Imóvel' placeholder='Selecione a Situação do Imóvel' options={situacoesImovel} />
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Select label='Cidade' search placeholder='Selecione a Cidade do Imóvel' options={cidades} />
            <Form.Select label='Estado' search placeholder='Selecione a Estado do Imóvel' options={estados} />
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Input label='Preço inicial' placeholder='Preço inicial do Imóvel' />
            <Form.Input label='Preço limite' placeholder='Preço limite do Imóvel' />
            <Form.Input label='Área inicial' placeholder='Área inicial em m² do Imóvel' />
            <Form.Input label='Área limite' placeholder='Área limite em m² do Imóvel' />
          </Form.Group>

          <Button color='blue' size='small' style={{width: 90}}>Buscar</Button>
          <Button color='blue' size='small' style={{width: 90}}>Limpar</Button>
          <Button color='green' size='small' style={{width: 90}} onClick={this.toggleCreateModalVisibility}>Adicionar</Button>
        </Form>

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
            <Table.Row>
              <Table.Cell><Image src='img/imovel01.jpg' size='medium' /></Table.Cell>
              <Table.Cell>Maria</Table.Cell>
              <Table.Cell>Casa</Table.Cell>
              <Table.Cell>Venda</Table.Cell>
              <Table.Cell>Florianópolis/SC</Table.Cell>
              <Table.Cell>R$ 250.000</Table.Cell>
              <Table.Cell>100 m²</Table.Cell>
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
          <Modal.Header>Cadastro de um novo Imóvel</Modal.Header>
          <Modal.Content scrolling>
            <Form size='small'>
              <Form.Select label='Proprietário' search placeholder='Cliente e Proprietário do Imóvel' />
              
              <Form.Input type="file" label='Foto Principal do Imóvel' />

              <Form.Group widths='equal'>
                <Form.Select label='Tipo de Imóvel' placeholder='Tipo de Imóvel' options={tiposImovel} />
                <Form.Select label='Situação do Imóvel' placeholder='Situação do Imóvel' options={situacoesImovel} />
                <Form.Input label='Área Total em m²' placeholder='Área Total do Imóvel em m²' />
              </Form.Group>
              
              <Form.Group widths='equal'>
                <Form.Input label='Valor R$' placeholder='Valor' />
                <Form.Input label='Valor do IPTU R$' placeholder='Valor do IPTU' />
                <Form.Input label='Valor do Condomínio R$' placeholder='Valor do Condomínio' />
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Input label='Número de Quartos' placeholder='Numero de Quartos' />
                <Form.Input label='Número de Banheiros' placeholder='Número de Banheiros' />
                <Form.Input label='Vagas na Garagem' placeholder='Número de Vagas na Garagem' />
              </Form.Group>

              <Divider />
              
              <Header size='medium'>Endereço do Imóvel</Header>
              <Form.Group>
                <Form.Input label='CEP' placeholder='CEP' width={4} />
                <Form.Input label='Rua' placeholder='Rua' width={6} />
                <Form.Input label='Bairro' placeholder='Bairro' width={6} />
              </Form.Group>
              <Form.Group>
                <Form.Input label='Número' placeholder='Número' width={4} />
                <Form.Input label='Complemento' placeholder='Complemento' width={6} />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Select label='Estado' search placeholder='Estado' options={estados} />
                <Form.Select label='Cidade' search placeholder='Cidade' options={cidades} />
              </Form.Group>

              <Divider />

              <Form.TextArea label='Descrição' placeholder='Informações Gerais sobre o Imóvel...' style={{ minHeight: 100 }} />
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