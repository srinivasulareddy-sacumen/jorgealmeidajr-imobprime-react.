
import React, { Component } from 'react'

import Imobiliarias from '../components/Imobiliarias'

export default class RealEstatesContainer extends Component {

  state = {
    createModalVibible: false,
    states: [],
    cities: [],
    realEstates: []
  }

  render() {
    return (<Imobiliarias />)
  }

}