import React, { Component } from 'react'

import { 
  withGoogleMap, withScriptjs,
  GoogleMap, Marker 
} from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    { props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} /> }
  </GoogleMap>
)))

export default class Home extends Component {

  render() {
    return (
      <div>
        <h1>Busca de Imóveis</h1>
        <MyMapComponent 
          isMarkerShown={true} 
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `700px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }

}