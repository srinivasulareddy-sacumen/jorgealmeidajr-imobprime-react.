import React, { Component } from 'react'

import { 
  Form, Button, 
  Divider, Header, Modal,
  Table, Icon, Image
} from 'semantic-ui-react'

export default class Imobiliarias extends Component {

  state = {
    createModalVibible: false
  }

  toggleCreateModalVisibility = () => this.setState({ createModalVibible: !this.state.createModalVibible })

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
          <Button color='green' size='small' style={{width: 90}} onClick={this.toggleCreateModalVisibility}>Adicionar</Button>
        </Form>

        <Divider />

        <Table celled striped compact size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2}>Logo</Table.HeaderCell>
              <Table.HeaderCell width={4}>Razão Social</Table.HeaderCell>
              <Table.HeaderCell width={2}>CNPJ</Table.HeaderCell>
              <Table.HeaderCell>Cidade da Sede</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell><Image src='img/ibagy-logo.png' size='tiny' /></Table.Cell>
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

        <Modal 
          size='large' dimmer
          open={this.state.createModalVibible} 
          onClose={this.toggleCreateModalVisibility}
        >
          <Modal.Header>Cadastro de uma nova Imobiliária</Modal.Header>
          <Modal.Content scrolling>
            <Form size='small'>
              <Form.Group widths='equal'>
                <Form.Input label='Razão Social' placeholder='Razão Social da Imobiliária' />
                <Form.Input label='CNPJ' placeholder='CNPJ da Imobiliária' />
              </Form.Group>
              <Form.Input type="file" label='Logo da Imobiliária' />

              <Divider />

              <Header size='medium'>Endereço da sede</Header>
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
                <Form.Input label='Estado' placeholder='Estado' />
                <Form.Input label='Cidade' placeholder='Cidade' />
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