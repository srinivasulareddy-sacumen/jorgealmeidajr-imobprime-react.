import React, { Component } from 'react'

import { 
  Button, Icon, 
  Header, Image, Grid,
  Menu, Select, 
  Sidebar, Segment,
  Modal
} from 'semantic-ui-react'

import { 
  withGoogleMap, withScriptjs,
  GoogleMap, Marker 
} from "react-google-maps"

import HomePropertiesSearch from './HomePropertiesSearch'

import GoogleMapsAPI from '../api/GoogleMapsAPI'
import ImoveisAPI from '../api/ImoveisAPI'
import CitiesAPI from '../api/CitiesAPI'


const MyMapComponent = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={props.defaultCenter}
  >
    {
      props.markers.map((marker) =>
        <Marker key={marker.index} position={marker.position} onClick={() => props.toggleImovelDetailsVisibility()} />
      )
    }
  </GoogleMap>
)))

export default class Home extends Component {

  state = {
    searchFormVisible: false,
    imovelDetailsVisible: false,
    searchMode: 'map',

    cityNameHomeParam: null,

    tipoImovel: null,
    disponibilidade: null,
    numeroQuartos: null,
    numeroGaragens: null,
    tiposImovel: [],
    
    cities: [],
    properties: [],
    defaultCenter: {lat: -27.5585325, lng: -48.4971103},
    center: null,
    markers: []
  }

  componentDidMount() {
    const tiposImovel = ImoveisAPI.getTiposImovel()
      .map((tipo) => ({ key: tipo.id, text: tipo.nome, value: tipo.id }))

    this.setState({ tiposImovel })

    CitiesAPI.fetchAllByName('')
      .then((resp) => {
        const cities = resp.data.map((c) => ({ key: c.id, text: `${c.name}, ${c.state.name}`, value: c.id }))
        this.setState({cities}) 
      })

    this.handlePropertiesMapInit()
  }

  getCurrentPosition(options) {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })
  }

  async handlePropertiesMapInit() {
    if (navigator.geolocation) {
      // geolocation is available
      const position = await this.getCurrentPosition()
      const lat = position.coords.latitude
      const lng = position.coords.longitude
        
      const googleMapsResp = await GoogleMapsAPI.fetchLocation(lat, lng)  
      
      if(googleMapsResp.data.status === 'OK') {
        this.handleGoogleMapsRespSuccess(googleMapsResp)
      }

    } else {
      // geolocation is not supported ...
    }
  }

  async handleGoogleMapsRespSuccess(googleMapsResp) {
    const result = googleMapsResp.data.results.find((r) => {
      return r.types.includes("locality") && r.types.includes("political")
    })

    // console.log(result)

    try {
      const addressName = result.formatted_address.split(',')
      const cityName = addressName[0].trim()
      const stateAbbreviation = addressName[1].trim()
      
      const city = await CitiesAPI.fetchOne(cityName, stateAbbreviation)

      const properties = await ImoveisAPI.fetchPropertiesMostRecent(city.data.id)
  
      const markers = properties.data.map((p) => {
        const addressData = JSON.parse(p.addressData)
        return { index: p.id, position: { lat: addressData.latitude, lng: addressData.longitude} }
      })

      this.setState({
        center: result.geometry.location, 
        defaultCenter: null, 
        markers, 
        properties
      })

    } catch(error) {
      console.log(error)
    }
  }

  propertySearchFormButtonClicked = () => {
    document.getElementById("propertySearch").scrollIntoView()
    setTimeout(() => this.toggleSearchFormVisibility(), 300)
  }

  toggleSearchFormVisibility = () => this.setState({ searchFormVisible: !this.state.searchFormVisible })

  toggleImovelDetailsVisibility = () => this.setState({ imovelDetailsVisible: !this.state.imovelDetailsVisible })

  handleDisponibilidadeChange = (e, { value }) => { }

  handleCityNameSearchChange = async (e, { searchQuery }) => {
    let cities = await CitiesAPI.fetchAllByName(searchQuery.trim())
    this.setState({ cities: cities.data.map((c) => ({ key: c.id, text: `${c.name}, ${c.state.name}`, value: c.id })) })
  }

  handleCityNameChange = async (e, {value}) => { 
    const cityId = value

    const cityResp = await CitiesAPI.fetchOneById(cityId)
    const cityName = `${cityResp.data.name}, ${cityResp.data.state.stateAbbreviation}`
    
    const googleMapsResp = await GoogleMapsAPI.fetchLocationByCityName(cityName)
    
    if(googleMapsResp.data.status === 'OK') {
      const result = googleMapsResp.data.results[0]

      const properties = await ImoveisAPI.fetchPropertiesMostRecent(cityResp.data.id)
  
      const markers = properties.data.map((p) => {
        const addressData = JSON.parse(p.addressData)
        return { index: p.id, position: { lat: addressData.latitude, lng: addressData.longitude} }
      })

      this.setState({ 
        center: result.geometry.location, 
        defaultCenter: null, 
        markers,
        properties
      })
    }

    this.setState({ cityNameHomeParam: value })
  }

  renderGridSearchMode = () => {
    let gridColumns = []

    for (let i = 0; i < this.state.properties.data.length; i++) { 
      let property = this.state.properties.data[i]
      let addressData = JSON.parse(property.addressData)

      gridColumns.push(
        <Grid.Column key={property.id}>
          <Image src='img/imovel01.jpg' size='small' />{property.imagePath}
          Disponível para Venda<br />
          Valor: <b>{property.price}</b><br />
          {addressData.rua}, {addressData.numero}<br />
          {addressData.bairro}<br />
          {addressData.cidade.nome_cidade} - {addressData.cidade.estado.sigla_estado}<br />
          {property.bedrooms} dormitórios<br />
          {property.bathrooms} banheiros<br />
          {property.garages} vaga de garagem<br />
          Área Total: {property.totalArea} m²<br />
          <br />
          <b>Contacte o Corretor : Nome / CRECI</b><br />
          Email / Celular / Telefone
        </Grid.Column>
      )
    }

    let gridRows = []
    let columns = []
    let rowKey = 1

    for (let i = 0; i < gridColumns.length; i++) { 
      columns.push(gridColumns[i])

      if((i + 1) % 3 === 0) {
        gridRows.push(
          <Grid.Row key={rowKey++}>
            {columns}
          </Grid.Row>
        )

        columns = []
      }

      if(i + 1 === gridColumns.length) {
        gridRows.push(
          <Grid.Row key={rowKey++}>
            {columns}
          </Grid.Row>
        )
      }
    }

    return gridRows
  }

  render() {
    const currentCenter = (this.state.center !== null) ? this.state.center : this.state.defaultCenter
    
    const { tiposImovel, cities } = this.state
    
    const googleMapURL = GoogleMapsAPI.getGoogleMapUrl()
    
    return (
      <div>
        <Header as='h1'>Busca de Imóveis</Header>

        <Menu>
          <Menu.Item>
            <Button icon color='blue' onClick={this.propertySearchFormButtonClicked}>
              <Icon name='search' />
            </Button>  
          </Menu.Item>

          <Menu.Item>
            {/* implement search by region/bairro */}
            <Select 
              placeholder='Informe a Cidade do Imóvel desejado...' 
              className='icon' icon='search' 
              style={{width: 380, height: 42}}
              search
              options={cities} 
              onSearchChange={this.handleCityNameSearchChange}
              onChange={this.handleCityNameChange} 
              value={this.state.cityNameHomeParam} />
          </Menu.Item>

          <Menu.Item position='right'>
            <Button.Group>
              <Button color='google plus' icon='world' style={{width: 50}}
                onClick={() => this.setState({ searchMode: 'map' })}></Button>
              <Button.Or text='ou' />
              <Button color='blue' icon='grid layout' style={{width: 50}}
                onClick={() => this.setState({ searchMode: 'grid' })}></Button>
            </Button.Group>
          </Menu.Item>
        </Menu>

        <Sidebar.Pushable id='propertySearch'>
          <Sidebar animation='overlay' width='very wide' direction='left' visible={this.state.searchFormVisible}>
            <Segment style={{height: '100%'}}>
              
              <HomePropertiesSearch 
                ref={(input) => this.homePropertiesSearch = input}
                tiposImovel={tiposImovel} />

            </Segment>
          </Sidebar>

          <Sidebar.Pusher>
            {this.state.searchMode === 'map' &&
            <MyMapComponent 
              defaultCenter={currentCenter}
              markers={this.state.markers}
              googleMapURL={googleMapURL}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `700px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              toggleImovelDetailsVisibility={this.toggleImovelDetailsVisibility}
            />}

            {
              this.state.searchMode === 'grid' && 
              <Grid columns={3} divided>
                {this.renderGridSearchMode()}
              </Grid>
            }
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        <Modal 
          size='large' dimmer={false} 
          open={this.state.imovelDetailsVisible} 
          onClose={this.toggleImovelDetailsVisibility}
        >
          <Modal.Header>Detalhes do Imóvel Selecionado</Modal.Header>
          <Modal.Content>
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <Header as='h2'>Disponível para Venda</Header>
                  Valor: <b>R$1.500.000</b><br />
                  Rua Teste, número 1111<br />
                  Centro, Florianópolis - SC<br />
                  2 dormitórios<br />
                  2 banheiros<br />
                  1 vaga de garagem<br />
                  Área Total: 60 m²<br />
                  <br />
                  <b>Contacte o Corretor : Nome / CRECI</b><br />
                  Email / Celular / Telefone
                </Grid.Column>
                <Grid.Column>
                  <Image src='img/imovel01.jpg' size='large' />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.toggleImovelDetailsVisibility}>Fechar</Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }

}