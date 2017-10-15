import React, { Component } from 'react'

import { 
  Button, 
  Sidebar, Segment,
  Modal
} from 'semantic-ui-react'

import { 
  withGoogleMap, withScriptjs,
  GoogleMap, Marker 
} from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: -27.539909, lng: -48.498802 }}
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
    markers: [
      { index: 1, position: { lat: -27.547659, lng: -48.497837 } },
      { index: 2, position: { lat: -27.560695, lng: -48.501969 } },
      { index: 3, position: { lat: -27.556242, lng: -48.499497 } },
      { index: 4, position: { lat: -27.554760, lng: -48.497931 } }
    ]
  }

  toggleSearchFormVisibility = () => this.setState({ searchFormVisible: !this.state.searchFormVisible })

  toggleImovelDetailsVisibility = () => this.setState({ imovelDetailsVisible: !this.state.imovelDetailsVisible })

  render() {
    return (
      <div>
        <h1>Busca de Imóveis</h1>

        <Button color='blue' size='small' style={{width: 90}} onClick={() => this.toggleSearchFormVisibility()}>Buscar</Button>

        <Sidebar.Pushable>
          <Sidebar animation='overlay' width='very wide' direction='left' visible={this.state.searchFormVisible}>
            <Segment style={{height: '100%'}}>
              mimimimi
            </Segment>
          </Sidebar>

          <Sidebar.Pusher>
            <MyMapComponent 
              markers={this.state.markers}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbAZsAD0dyCmoVyIJJhmlGa4XtjsxFdqQ&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `700px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              toggleImovelDetailsVisibility={this.toggleImovelDetailsVisibility}
            />
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        <Modal 
          size='large' dimmer={false} 
          open={this.state.imovelDetailsVisible} 
          onClose={this.toggleImovelDetailsVisibility}
        >
          <Modal.Header>Detalhes do Imóvel Selecionado</Modal.Header>
          <Modal.Content>
            <p>imovel mimi</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.toggleImovelDetailsVisibility}>Fechar</Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }

}