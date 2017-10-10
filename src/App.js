import React, { Component } from 'react'
import { Segment, Menu } from 'semantic-ui-react'
import { Link, Route } from 'react-router-dom'

import logo from './logo.svg'
import './App.css'

import Corretores from './components/Corretores'
import Imobiliarias from './components/Imobiliarias'
import Imoveis from './components/Imoveis'
import Clientes from './components/Clientes'

export default class App extends Component {

  state = { activeItem: 'home' }

  componentDidMount() {
    const urlArray = window.location.href.split("/")
    if(urlArray.indexOf("corretores") !== -1)
      this.handleItemClick('corretores')

    else if(urlArray.indexOf("clientes") !== -1)
      this.handleItemClick('clientes')
    
    else if(urlArray.indexOf("imoveis") !== -1)
      this.handleItemClick('imoveis')

    else if(urlArray.indexOf("imobiliarias") !== -1)
      this.handleItemClick('imobiliarias')
  }

  handleItemClick = (name) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to iMobPrime</h1>
        </header>
        <Segment inverted style={{margin: 0, borderRadius: 0}}>
          <Menu inverted pointing secondary>
            <Menu.Item 
              name='home' active={activeItem === 'home'} 
              onClick={() => this.handleItemClick('home')}
              as={Link} to='/home'>
              Home
            </Menu.Item>

            <Menu.Item 
              name='clientes' active={activeItem === 'clientes'} 
              onClick={() => this.handleItemClick('clientes')}
              as={Link} to='/clientes'>
              Clientes
            </Menu.Item>

            <Menu.Item 
              name='imoveis' active={activeItem === 'imoveis'} 
              onClick={() => this.handleItemClick('imoveis')}
              as={Link} to='/imoveis'>
              Imóveis
            </Menu.Item>

            <Menu.Item 
              name='corretores' active={activeItem === 'corretores'} 
              onClick={() => this.handleItemClick('corretores')}
              as={Link} to='/corretores'>
              Corretores
            </Menu.Item>

            <Menu.Item 
              name='imobiliarias' active={activeItem === 'imobiliarias'} 
              onClick={() => this.handleItemClick('imobiliarias')}
              as={Link} to='/imobiliarias'>
              Imobiliárias
            </Menu.Item>
          </Menu>
        </Segment>

        <div className="App-intro">
          <Route path="/clientes" component={Clientes}/>
          <Route path="/imoveis" component={Imoveis}/>
          <Route path="/corretores" component={Corretores}/>
          <Route path="/imobiliarias" component={Imobiliarias}/>
        </div>
      </div>
    )
  }

}
