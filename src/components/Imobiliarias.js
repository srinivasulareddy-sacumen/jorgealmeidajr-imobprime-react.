import React, { Component } from 'react'

import { 
  Form, Input, Select, Button, 
  Divider, Header, Modal,
  Table, Icon, Image
} from 'semantic-ui-react'

import StatesAPI from '../api/StatesAPI'
import RealEstatesAPI from '../api/RealEstatesAPI'
import CidadesAPI from '../api/CidadesAPI'

export default class Imobiliarias extends Component {

  state = {
    searchByName: '',
    searchByCNPJ: '',
    searchByState: null,
    searchByCity: null,

    createModalVibible: false,
    states: [],
    cidades: [],
    realEstates: []
  }

  componentDidMount() {
    this.init()

    const cidades = CidadesAPI.getCidades()
      .map((e) => ({ key: e.id, text: e.nome, value: e.id }))

    this.setState({ cidades })

    RealEstatesAPI.fetchAll()
      .then((response) => {
        this.setState({ realEstates: response.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async init() {
    try {
      const statesData = await StatesAPI.fetchAll();
      const states = statesData.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))

      this.setState({ states })
    } catch(error) {
      console.log(error)
    }
  }

  // handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  handleSelectChange = (name, value) => this.setState({ [name]: value })

  toggleCreateModalVisibility = () => this.setState({ createModalVibible: !this.state.createModalVibible })

  search = (e) => {
    e.preventDefault()
    const {searchByName, searchByState, searchQuery} = this.state
    console.log(searchByName, searchByState, searchQuery)
  }

  clearSearchForm = (e) => {
    e.preventDefault()
    
    this.setState({
      searchByName: '',
      searchByCNPJ: '',
      searchByState: null,
      searchByCity: null
    })
  }

  handleSearchChange = (e, { searchQuery }) => {
    this.setState({ searchQuery })
  }

  handleSearchCidadeFocus = (e, data) => { 
    if(this.state.searchByState !== null)  {
      CidadesAPI.filter('', this.state.searchByState)
        .then((response) => {
          this.setState({ cidades: response.data.map((e) => ({ key: e.id, text: e.name, value: e.id })) })
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      CidadesAPI.fetchAll()
        .then((response) => {
          this.setState({ cidades: response.data.map((e) => ({ key: e.id, text: e.name, value: e.id })) })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  render() {
    const { states, cidades, realEstates } = this.state

    return (
      <div>
        <h1>Listagem de Imobiliárias</h1>

        <Form size='small'>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Razão Social</label>
              <Input 
                placeholder='Razão Social da Imobiliária' 
                className='form-input' 
                onChange={e => this.setState({ searchByName: e.target.value })}
                value={this.state.searchByName} />
            </Form.Field>
            
            <Form.Field>
              <label>CNPJ</label> 
              <Input 
                label='#' placeholder='99.999.999/9999-99' 
                className='form-input' 
                onChange={e => this.setState({ searchByCNPJ: e.target.value })}
                value={this.state.searchByCNPJ}/>
            </Form.Field>
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Field>
              <label>Estado</label>
              <Select 
                placeholder='Selecione o Estado do endereço da Imobiliária' 
                className='form-select'
                search 
                options={states}
                onChange={(e, {value}) => this.handleSelectChange('searchByState', value)} 
                value={this.state.searchByState} />
            </Form.Field>

            <Form.Field>
              <label>Cidade</label>
              <Select 
                placeholder='Selecione a Cidade do endereço da Imobiliária' 
                className='form-select'
                search
                options={cidades} 
                onFocus={this.handleSearchCidadeFocus}
                onSearchChange={this.handleSearchChange}
                onChange={(e, {value}) => this.handleSelectChange('searchByCity', value)} 
                value={this.state.searchByCity}/>
            </Form.Field>
          </Form.Group>

          <Button color='blue' size='small' style={{width: 90}} onClick={this.search}>Buscar</Button>
          <Button color='blue' size='small' style={{width: 90}} onClick={this.clearSearchForm}>Limpar</Button>
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
            {realEstates.map(r => {
              return (
                <Table.Row key={r.id}>
                  <Table.Cell><Image src='img/ibagy-logo.png' size='tiny' /> / {r.logoImagePath}</Table.Cell>
                  <Table.Cell>{r.name}</Table.Cell>
                  <Table.Cell>{r.cnpj}</Table.Cell>
                  <Table.Cell>{r.cofeci}</Table.Cell>
                  <Table.Cell>{r.addressZipCode.city.name} / {r.addressZipCode.city.state.stateAbbreviation}</Table.Cell>
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
            })}
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
                <Form.Input required error label='Razão Social' placeholder='Razão Social da Imobiliária' />
                
                <Form.Field required error>
                  <label>CNPJ</label>
                  <Input label='#' placeholder='99.999.999/9999-99' />
                </Form.Field>

                <Form.Field required error>
                  <label>COFECI</label>
                  <Input placeholder='0' />
                </Form.Field>
              </Form.Group>

              <Form.Input type="file" label='Logo da Imobiliária' />

              <Divider />

              <Header size='medium'>Endereço da sede</Header>
              <Form.Group>
                <Form.Field required width={4} error>
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
                <Form.Select label='Estado' placeholder='Estado' search options={states} />
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