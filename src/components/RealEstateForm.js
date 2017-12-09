
import React, { Component } from 'react'

import { Form, Input, Select, Divider, Header } from 'semantic-ui-react'

export default class RealEstateForm extends Component {

  state = {
    name: '',
    cnpj: '',
    cofeci: '',
    addressZipCode: '',
    addressNumber: '',
    addressDescription: '',

    cities: []
  }

  render() {
    const { cities } = this.state

    return (
      <Form size='small'>
        <Form.Group widths='equal'>
          {/* required error */}
          <Form.Input 
            label='Razão Social' 
            placeholder='Razão Social da Imobiliária' 
            onChange={e => this.setState({ name: e.target.value }, () => this.props.setRealEstate({ name: this.state.name }))}
            value={this.state.name} />
          
          {/* required error */}
          <Form.Field>
            <label>CNPJ</label>
            <Input 
              label='#' 
              placeholder='99.999.999/9999-99'
              onChange={e => this.setState({ cnpj: e.target.value }, () => this.props.setRealEstate({ cnpj: this.state.cnpj }))}
              value={this.state.cnpj} />
          </Form.Field>

          {/* required error */}
          <Form.Field>
            <label>COFECI</label>
            <Input 
              placeholder='0'
              onChange={e => this.setState({ cofeci: e.target.value }, () => this.props.setRealEstate({ cofeci: this.state.cofeci }))}
              value={this.state.cofeci} />
          </Form.Field>
        </Form.Group>

        <Form.Input type="file" label='Logo da Imobiliária' />

        <Divider />

        <Header size='medium'>Endereço da sede</Header>
        <Form.Group>
          {/* required error */}
          <Form.Field width={4}>
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
          <Form.Select label='Estado' placeholder='Estado' search options={this.props.states} />
          <Form.Select label='Cidade' placeholder='Cidade' search options={cities} />
        </Form.Group>
      </Form>
    )
  }

}