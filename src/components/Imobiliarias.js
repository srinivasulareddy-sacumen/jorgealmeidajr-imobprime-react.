import React, { Component } from 'react'

import { 
  Form, Input, Button, 
  Divider, Header, Modal,
  Table, Icon, Image
} from 'semantic-ui-react'

import CidadesAPI from '../api/CidadesAPI'

export default class Imobiliarias extends Component {

  state = {
    createModalVibible: false,
    estados: [],
    cidades: []
  }

  componentDidMount() {
    const estados = CidadesAPI.getEstados()
      .map((e) => ({ key: e.id, text: e.nome, value: e.id }))

    const cidades = CidadesAPI.getCidades()
      .map((e) => ({ key: e.id, text: e.nome, value: e.id }))

    this.setState({ estados, cidades })
  }

  toggleCreateModalVisibility = () => this.setState({ createModalVibible: !this.state.createModalVibible })

  render() {
    const { estados, cidades } = this.state

    return (
      <div>
        <h1>Listagem de Imobiliárias</h1>

        <Form size='small'>
          <Form.Group widths='equal'>
            <Form.Input label='Razão Social' placeholder='Razão Social da Imobiliária' />

            <Form.Field>
              <label>CNPJ</label>
              <Input label='#' placeholder='99.999.999/9999-99' />
            </Form.Field>
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Select label='Estado' placeholder='Estado' search options={estados} />
            <Form.Select label='Cidade' placeholder='Cidade do endereço da Imobiliária' search options={cidades} />
          </Form.Group>

          <Button color='blue' size='small' style={{width: 90}}>Buscar</Button>
          <Button color='blue' size='small' style={{width: 90}}>Limpar</Button>
          <Button color='green' size='small' style={{width: 90}} onClick={this.toggleCreateModalVisibility}>Adicionar</Button>
        </Form>

        <Divider />

        <Table celled striped compact size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2}>Logo</Table.HeaderCell>
              <Table.HeaderCell width={4}>Razão Social</Table.HeaderCell>
              <Table.HeaderCell width={2}>CNPJ</Table.HeaderCell>
              <Table.HeaderCell width={2}>COFECI</Table.HeaderCell>
              <Table.HeaderCell>Cidade da Sede</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell><Image src='img/ibagy-logo.png' size='tiny' /></Table.Cell>
              <Table.Cell>IBagy</Table.Cell>
              <Table.Cell>99.999.999/9999-99</Table.Cell>
              <Table.Cell>2500</Table.Cell>
              <Table.Cell>Florianópolis/SC</Table.Cell>
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
          <Modal.Header>Cadastro de uma nova Imobiliária</Modal.Header>
          <Modal.Content scrolling>
            <Form size='small'>
              <Form.Group widths='equal'>
                <Form.Input required label='Razão Social' placeholder='Razão Social da Imobiliária' />
                
                <Form.Field required>
                  <label>CNPJ</label>
                  <Input label='#' placeholder='99.999.999/9999-99' />
                </Form.Field>

                <Form.Field required>
                  <label>COFECI</label>
                  <Input placeholder='0' />
                </Form.Field>
              </Form.Group>

              <Form.Input type="file" label='Logo da Imobiliária' />

              <Divider />

              <Header size='medium'>Endereço da sede</Header>
              <Form.Group>
                <Form.Field required width={4}>
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