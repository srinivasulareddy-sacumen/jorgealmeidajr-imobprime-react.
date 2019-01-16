
import React, { Component } from 'react'

import { Form, Input, Select, Divider, Header, Button, Modal } from 'semantic-ui-react'

import PropertyTypesAPI from '../api/PropertyTypesAPI'
import PropertyStatesAPI from '../api/PropertyStatesAPI'
import StatesAPI from '../api/StatesAPI'
import CitiesAPI from '../api/CitiesAPI'

export default class PropertyCreateModal extends Component {

  constructor(props) {
    super(props)

    this.state = {      
      postalCode: '',
      region: '',
      street: '',
      type: '',
      addressNumber: '',
      addressDescription: '',
      stateId: null,
      cityId: null,
      
      ...this.getInitialStateErrors(),

      propertyTypes: [],
      propertyStates: [],
      states: [],
      cities: [],
    }
  }

  componentDidMount() {
    (async () => {
      try {
        const states = await this.fetchStates()
        const cities = await this.fetchInitialCities()
        const propertyTypes = await this.fetchPropertyTypes()
        const propertyStates = await this.fetchPropertyStates()

        this.setState({
          propertyTypes, 
          propertyStates, 
          states, 
          cities
        })
      } catch(error) {
        console.log(error)
      }
    })();
  }

  async fetchStates() {
    const resp = await StatesAPI.fetchAll()
    return resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
  }

  async fetchInitialCities() {
    const resp = await CitiesAPI.fetchAll()
    return resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
  }

  async fetchPropertyTypes() {
    const resp = await PropertyTypesAPI.fetchAll()
    return resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
  }

  async fetchPropertyStates() {
    const resp = await PropertyStatesAPI.fetchAll()
    return resp.data.map((e) => ({ key: e.id, text: e.name, value: e.id }))
  }

  getInitialStateErrors() {
    return {
      ownerError: false,
      propertyTypeError: false,
      postalCodeError: false
    }
  }

  render() {
    const {propertyTypes, propertyStates} = this.state

    return (
      <Modal 
        size='large' dimmer
        open={this.props.createModalVibible} 
        onClose={this.props.toggleCreateModalVisibility}
      >
        <Modal.Header>Cadastro de um novo Imóvel</Modal.Header>
        <Modal.Content scrolling>
          {/*<pre>{JSON.stringify(this.props.property, null, 2)}</pre>*/}

          <Form size='small'>
            <Form.Select 
              label='Proprietário'  
              required error search
              placeholder='TODO: Proprietário do Imóvel' 
              options={[]} />
            
            <Form.Group widths='equal'>
              <Form.Field required error={this.state.propertyTypeError}>
                <label>Tipo de Imóvel</label>
                <Select 
                  placeholder='Selecione o Tipo de Imóvel' 
                  className='form-select'
                  search
                  options={propertyTypes}
                  onChange={(e, {value}) => this.props.updateCreateProperty({type: {id: value}})} 
                  value={this.props.property.type.id} />
              </Form.Field>

              <Form.Field>
                <label>Situação do Imóvel</label>
                <Select 
                  placeholder='Selecione a Situação do Imóvel' 
                  className='form-select'
                  search
                  options={propertyStates}
                  onChange={(e, {value}) => this.props.updateCreateProperty({state: {id: value}})} 
                  value={this.props.property.state.id} />
              </Form.Field>

              <Form.Field>
                <label>Área total</label>
                <Input 
                  label='m²' labelPosition='right' placeholder='0' 
                  onChange={(e) => this.props.updateCreateProperty({totalArea: e.target.value})}
                  value={this.props.property.totalArea} />
              </Form.Field>
            </Form.Group>
            
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Valor</label>
                <Input 
                  label='R$' placeholder='0,00' 
                  onChange={(e) => this.props.updateCreateProperty({price: e.target.value})}
                  value={this.props.property.price} />
              </Form.Field>

              <Form.Field>
                <label>Valor do Condomínio</label>
                <Input 
                  label='R$' placeholder='0,00' 
                  onChange={(e) => this.props.updateCreateProperty({priceCondo: e.target.value})}
                  value={this.props.property.priceCondo} />
              </Form.Field>

              <Form.Field>
                <label>Número de Quartos</label>
                <Input 
                  placeholder='0' 
                  onChange={(e) => this.props.updateCreateProperty({bedrooms: e.target.value})}
                  value={this.props.property.bedrooms} />
              </Form.Field>

              <Form.Field>
                <label>Número de Banheiros</label>
                <Input 
                  placeholder='0' 
                  onChange={(e) => this.props.updateCreateProperty({bathrooms: e.target.value})}
                  value={this.props.property.bathrooms} />
              </Form.Field>

              <Form.Field>
                <label>Número de Garagens</label>
                <Input 
                  placeholder='0' 
                  onChange={(e) => this.props.updateCreateProperty({garages: e.target.value})}
                  value={this.props.property.garages} />
              </Form.Field>
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
              <Form.Select label='Estado' search placeholder='Estado' options={[]} />
              <Form.Select label='Cidade' search placeholder='Cidade' options={[]} />
            </Form.Group>

            <Divider />

            <Form.TextArea 
              label='Descrição' 
              placeholder='Informações Gerais sobre o Imóvel...' 
              style={{ minHeight: 100 }}
              onChange={(e) => this.props.updateCreateProperty({description: e.target.value})}
              value={this.props.property.description} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.props.toggleCreateModalVisibility}>Cancelar</Button>
          <Button color='blue' onClick={this.props.toggleCreateModalVisibility}>Salvar</Button>
        </Modal.Actions>
      </Modal>
    )
  }

}