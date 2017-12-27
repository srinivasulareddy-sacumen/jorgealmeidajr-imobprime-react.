
import axios from 'axios'

const API_KEY = 'AIzaSyDbAZsAD0dyCmoVyIJJhmlGa4XtjsxFdqQ'

export default class GoogleMapsAPI {

  static fetchLocation(lat, lng) {    
    const request = axios({
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`,
      headers: []
    })

    return request
  }

  static getGoogleMapUrl() {
    return `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`
  }

}