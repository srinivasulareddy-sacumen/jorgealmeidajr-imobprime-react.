import React, { Component } from 'react'

import { 
  Form, Input, Button, 
  Divider, Modal, Header, Image,
  Table, Icon
} from 'semantic-ui-react'

import PropertiesSearchForm from './PropertiesSearchForm'

import PropertiesAPI from '../api/PropertiesAPI'
import CitiesAPI from '../api/CitiesAPI'

export default class Properties extends Component {

  state = {
    createModalVibible: false,
    editModalVisible: false,
    deleteModalVisible: false,

    properties: [],

    tiposImovel: [],
    situacoesImovel: [],
    cidades: [],
    estados: []
  }

  componentDidMount() {
    const tiposImovel = PropertiesAPI.getTiposImovel()
      .map((tipo) => ({ key: tipo.id, text: tipo.nome, value: tipo.id }))

    const situacoesImovel = PropertiesAPI.getSituaçoesImovel()
      .map((situacao) => ({ key: situacao.id, text: situacao.nome, value: situacao.id }))

    const cidades = CitiesAPI.getCidades()
      .map((c) => ({ key: c.id, text: c.nome, value: c.id }))

    const estados = CitiesAPI.getEstados()
      .map((e) => ({ key: e.id, text: e.nome, value: e.id }))

    this.setState({ tiposImovel, situacoesImovel, cidades, estados });

    (async () => {
      await this.fetchInitialProperties()  
    })();
  }

  fetchInitialProperties = async () => {
    const propertiesResp = await PropertiesAPI.fetchAll()
    const properties = propertiesResp.data

    this.setState({properties})
  }

  toggleCreateModalVisibility = () => this.setState({ createModalVibible: !this.state.createModalVibible })

  render() {
    const { tiposImovel, situacoesImovel, cidades, estados,  properties } = this.state

    return (
      <div>
        <h1>Listagem de Imóveis</h1>

        <PropertiesSearchForm 
          fetchInitialProperties={this.fetchInitialProperties}
          toggleCreateModalVisibility={this.toggleCreateModalVisibility}
        />

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
          {
            properties.map(property => (
              <Table.Row key={property.id}>
                <Table.Cell><b>TODO:</b> <Image src='img/imovel01.jpg' size='small' /></Table.Cell>
                <Table.Cell><b>TODO:</b> owner</Table.Cell>
                <Table.Cell>{property.type.name}</Table.Cell>
                <Table.Cell>{property.state.name}</Table.Cell>
                <Table.Cell><b>TODO:</b> Florianópolis/SC</Table.Cell>
                <Table.Cell>{property.price}</Table.Cell>
                <Table.Cell>{property.totalArea} m²</Table.Cell>

                <Table.Cell collapsing textAlign='left'>
                  <Button color='blue' size='small' icon>
                    <Icon name='edit' />
                  </Button>

                  <Button color='red' size='small' icon>
                    <Icon name='remove' />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          }
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
              <Form.Select label='Proprietário' required error search placeholder='Proprietário do Imóvel' />
              
              <Form.Group widths='equal'>
                <Form.Select label='Tipo de Imóvel' required error placeholder='Tipo de Imóvel' options={tiposImovel} />
                <Form.Select label='Situação do Imóvel' placeholder='Situação do Imóvel' options={situacoesImovel} />

                <Form.Field>
                  <label>Área total</label>
                  <Input label='m²' labelPosition='right' placeholder='0' />
                </Form.Field>
              </Form.Group>
              
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>Valor</label>
                  <Input label='R$' placeholder='0,00' />
                </Form.Field>

                <Form.Field>
                  <label>Valor do Condomínio</label>
                  <Input label='R$' placeholder='0,00' />
                </Form.Field>

                <Form.Input label='Número de Quartos' placeholder='0' />
                <Form.Input label='Número de Banheiros' placeholder='0' />
                <Form.Input label='Vagas na Garagem' placeholder='0' />
              </Form.Group>

              <Form.Input type="file" label='Foto Principal do Imóvel' />

              <Divider />
              
              <Header size='medium'>Endereço do Imóvel</Header>
              <Form.Group>
                <Form.Field required error>
                  <label>CEP</label>
                  <Input label='#' placeholder='99.999-999' width={4} />
                </Form.Field>

                <Form.Input label='Rua' placeholder='Rua' width={6} />
                <Form.Input label='Bairro' placeholder='Bairro' width={6} />
              </Form.Group>

              <Form.Group>
                <Form.Input label='Número' placeholder='0' width={4} />
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