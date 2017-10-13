import React, { Component } from 'react'

import { 
  Segment, Menu, Sidebar,
  Form, Button,
  Icon
} from 'semantic-ui-react'

import { Link, Switch, Route } from 'react-router-dom'

import logo from './logo.svg'
import './App.css'

import Home from './components/Home'
import Corretores from './components/Corretores'
import Imobiliarias from './components/Imobiliarias'
import Imoveis from './components/Imoveis'
import Clientes from './components/Clientes'

export default class App extends Component {

  state = { 
    activeItem: 'home',
    loginVisible: false
  }

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

    this.setState({ loginVisible: false })
  }

  handleItemClick = (name) => this.setState({ activeItem: name, loginVisible: false })

  toggleLoginVisibility = () => this.setState({ loginVisible: !this.state.loginVisible })

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

            <Menu.Menu position='right'>
              <Menu.Item name='login' active onClick={() => this.toggleLoginVisibility()}>
                Login
              </Menu.Item>
              <Menu.Item name='logout' active onClick={() => this.setState({ loginVisible: false })}>
                Logout
              </Menu.Item>
              <Menu.Item name='conta' active onClick={() => this.handleMinhaContaClick()}>
                Minha Conta
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Segment>

        <Sidebar.Pushable>
          <Sidebar animation='overlay' width='very wide' direction='right' visible={false}>
            <Segment inverted color='blue' style={{height: '100%'}}>
              <Form size='small' inverted>
                <Form.Input label='Email' placeholder='Email' />
                <Form.Input label='Senha' placeholder='Senha' />
                <Button color='red' size='small' style={{width: 90}} 
                  onClick={() => this.setState({ loginVisible: false })}>Cancelar</Button>
                <Button color='facebook' size='small' style={{width: 90}} 
                  onClick={() => this.setState({ loginVisible: false })}>Salvar</Button>
              </Form>
            </Segment>
          </Sidebar>

          <Sidebar animation='overlay' width='very wide' direction='right' visible={this.state.loginVisible}>
            <Segment inverted color='teal' style={{height: '100%'}}>
              <Form size='small' inverted>
                <Form.Input label='Email' placeholder='Email' />
                <Form.Input label='Senha' placeholder='Senha' />
                <Button color='red' size='small' style={{width: 90}} 
                  onClick={() => this.setState({ loginVisible: false })}>Cancelar</Button>
                <Button color='blue' size='small' style={{width: 90}} 
                  onClick={() => this.setState({ loginVisible: false })}>Login</Button>
              </Form>
            </Segment>
          </Sidebar>

          <Sidebar.Pusher>
            <div className="App-intro">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/home" component={Home}/>
                <Route path="/clientes" component={Clientes}/>
                <Route path="/imoveis" component={Imoveis}/>
                <Route path="/corretores" component={Corretores}/>
                <Route path="/imobiliarias" component={Imobiliarias}/>
              </Switch>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        <footer className="App-footer">
          <h3>Aplicativo implementado pela iMob Soluções</h3>
          <a href='https://github.com/jorgealmeidajr/imobprime-react' style={{color: 'white'}}>
            <Icon name='github' size='huge' />Acessar o código-fonte da aplicação
          </a>
        </footer>
      </div>
    )
  }

}
