import React, { Component } from 'react'

import { 
  withGoogleMap, withScriptjs,
  GoogleMap, Marker 
} from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{ lat: -27.594244, lng: -48.549028 }}
  >
    { props.isMarkerShown && <Marker position={{ lat: -27.547659, lng: -48.497837 }} /> }
  </GoogleMap>
)))

export default class Home extends Component {

  render() {
    return (
      <div>
        <h1>Busca de Imóveis</h1>
        <MyMapComponent 
          isMarkerShown={true} 
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbAZsAD0dyCmoVyIJJhmlGa4XtjsxFdqQ&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `700px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }

}