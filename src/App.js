import React, { Component } from 'react'

import { 
  Segment, Menu, Sidebar,
  Form, Input, Button,
  Icon
} from 'semantic-ui-react'

import { Link, Switch, Route } from 'react-router-dom'

import logo from './logo.svg'
import './App.css'

import Home from './components/Home'
import Agents from './components/Agents'
import Imobiliarias from './components/Imobiliarias'
import Properties from './components/Properties'
import Clients from './components/Clients'

import CitiesAPI from './api/CitiesAPI'

export default class App extends Component {

  state = { 
    activeItem: 'home',
    loginVisible: false,
    loginForm: { email: '', senha: '' },
    usuarioLogado: null,
    meusDadosVisible: false,
    imobiliarias: [],
    estados: [],
    cidades: []
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

    /*ImobiliariasAPI.fetchAll()
      .then((response) => {
        const imobiliarias = response.data.map((i) => ({ key: i.id, text: i.name, value: i.id }))
        this.setState({ imobiliarias: imobiliarias })
      })
      .catch((error) => {
        console.log(error)
      })*/

    const estados = CitiesAPI.getEstados()
      .map((c) => ({ key: c.id, text: c.nome, value: c.id }))

    const cidades = CitiesAPI.getCidades()
      .map((e) => ({ key: e.id, text: e.nome, value: e.id }))

    this.setState({ loginVisible: false, estados, cidades })
  }

  handleItemClick = (name) => this.setState({ activeItem: name, loginVisible: false })

  toggleLoginVisibility = () => this.setState({ loginVisible: !this.state.loginVisible })

  toggleMeusDadosVisibility = () => this.setState({ meusDadosVisible: !this.state.meusDadosVisible })

  handleLoginFormChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      loginForm: {...this.state.loginForm, [name]: value }
    })
  }

  handleLoginButtonClicked = () => {
    const email = this.state.loginForm.email.toLocaleLowerCase()
    const perfil = this.state.loginForm.email.toLocaleLowerCase()

    if(email === 'admin' || email === 'corretor') {
      this.setState({ loginVisible: false }, () => {
        if(sessionStorage) {
          const usuarioLogado = { email, perfil }

          sessionStorage.setItem("usuarioLogado", usuarioLogado)
          this.setState({ usuarioLogado: usuarioLogado, loginForm: { email: '', senha: '' } })
        } else {
          alert("Sorry, your browser do not support session storage.")
        }
      })

    } else {
      this.setState({ usuarioLogado: null, loginForm: { email: '', senha: '' } })
    }
  }

  handleLogoutButtonClicked = () => {
    this.setState({ loginVisible: false }, () => {
      if(sessionStorage) {
        sessionStorage.setItem("usuarioLogado", null)
        this.setState({ usuarioLogado: null }, () => window.location.href = '/home')

      } else {
        alert("Sorry, your browser do not support session storage.")
      }
    })
  }

  // TODO: submit form quando pressionar o enter
  onEnterPressedLoginSubmit = (e) => {
    try {
      if(e.keyCode === 13 && e.shiftKey === false) {
        console.log(this.state.loginForm) // o state nao vem com os dados do form
        //this.handleLoginButtonClicked()
      }
    } catch(error) {
      console.error('ERRO: ' + error)
    }
  }

  handleCancelLoginClicked = () => {
    this.setState({ 
      loginVisible: false,
      usuarioLogado: null, 
      loginForm: { email: '', senha: '' } 
    })
  }

  handleMeusDadosClicked = () => this.toggleMeusDadosVisibility()

  render() {
    const { activeItem, meusDadosVisible, imobiliarias, estados, cidades } = this.state
    const emailPlaceholder = "Coloque 'admin' ou 'corretor'";
    const versao = "1.0.0";

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
                        
            {/* Os itens de menu /imobiliarias e /corretores podem ser acessados pelo ADMIN */}
            {
              this.state.usuarioLogado != null && this.state.usuarioLogado.perfil === 'admin' &&
              <Menu.Item 
                name='imobiliarias' active={activeItem === 'imobiliarias'} 
                onClick={() => this.handleItemClick('imobiliarias')}
                as={Link} to='/imobiliarias'>
                Imobiliárias
              </Menu.Item>
            }
            {
              this.state.usuarioLogado != null && this.state.usuarioLogado.perfil === 'admin' &&
              <Menu.Item 
                name='corretores' active={activeItem === 'corretores'} 
                onClick={() => this.handleItemClick('corretores')}
                as={Link} to='/corretores'>
                Corretores
              </Menu.Item>
            }

            {
              this.state.usuarioLogado != null && 
              (this.state.usuarioLogado.perfil === 'corretor' || this.state.usuarioLogado.perfil === 'admin') &&
              <Menu.Item 
                name='clientes' active={activeItem === 'clientes'} 
                onClick={() => this.handleItemClick('clientes')}
                as={Link} to='/clientes'>
                Clientes
              </Menu.Item>
            }

            {
              this.state.usuarioLogado != null && 
              (this.state.usuarioLogado.perfil === 'corretor' || this.state.usuarioLogado.perfil === 'admin') &&
              <Menu.Item 
                name='imoveis' active={activeItem === 'imoveis'} 
                onClick={() => this.handleItemClick('imoveis')}
                as={Link} to='/imoveis'>
                Imóveis
              </Menu.Item>
            }
            
            <Menu.Menu position='right'>
              {
                this.state.usuarioLogado == null &&
                <Menu.Item name='login' active onClick={() => this.toggleLoginVisibility()}>
                  Login
                </Menu.Item>
              }
              
              {
                this.state.usuarioLogado != null &&
                <Menu.Item name='logout' active onClick={() => this.handleLogoutButtonClicked()}>
                  Logout
                </Menu.Item>
              }

              {
                this.state.usuarioLogado != null && this.state.usuarioLogado.perfil === 'corretor' &&
                <Menu.Item name='conta' active onClick={this.handleMeusDadosClicked}>
                  Meus Dados
                </Menu.Item>
              }
            </Menu.Menu>
          </Menu>
        </Segment>

        <Sidebar.Pushable>
          <Sidebar animation='overlay' width='very wide' direction='right' visible={meusDadosVisible}>
            <Segment style={{height: '100%'}}>
              <Form size='small'>
                <Form.Select label='Imobiliária' placeholder='Imobiliária' search options={imobiliarias} required error />

                <Form.Input label='Nome' placeholder='Nome do Corretor' required error />

                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>CPF</label>
                    <b>999.999.999-99</b>
                  </Form.Field>

                  <Form.Field>
                    <label>CRECI</label>
                    <b>9999</b>
                  </Form.Field>
                </Form.Group>

                <Form.Field>
                  <label>Site</label>
                  <Input label='http://' placeholder='Site do Corretor' />
                </Form.Field>

                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>Telefone</label>
                    <Input label='#' placeholder='(99) 9999-9999' />
                  </Form.Field>

                  <Form.Field>
                    <label>Celular</label>
                    <Input label='#' placeholder='(99) 99999-9999' />
                  </Form.Field>
                </Form.Group>

                <Form.Group widths='equal'>
                  <Form.Select label='Estado' placeholder='Estado de atuação' search options={estados} required error />
                  <Form.Select label='Cidade' placeholder='Cidade de atuação' search options={cidades} />
                </Form.Group>

                <Form.Field>
                  <label>Email</label>
                  <b>emaildocorretor@gmail.com</b>
                </Form.Field>

                <Form.Input type='password' label='Senha Anterior' placeholder='Senha Anterior' />
                <Form.Input type='password' label='Nova Senha' placeholder='Nova Senha' />

                <Button color='red' size='small' style={{width: 90}} 
                  onClick={this.toggleMeusDadosVisibility}>Cancelar</Button>
                <Button color='facebook' size='small' style={{width: 90}} 
                  onClick={this.toggleMeusDadosVisibility}>Salvar</Button>
              </Form>
            </Segment>
          </Sidebar>

          <Sidebar animation='overlay' width='very wide' direction='right' visible={this.state.loginVisible}>
            <Segment inverted color='teal' style={{height: '100%'}}>
              <Form size='small' inverted>
                <Form.Input label='Email' placeholder={emailPlaceholder} name='email'
                  value={this.state.loginForm.email} 
                  onChange={this.handleLoginFormChange} />

                <Form.Input label='Senha' placeholder='Senha' type="password" name='senha'
                  value={this.state.loginForm.senha} 
                  onChange={this.handleLoginFormChange} />

                <Button color='red' size='small' style={{width: 90}} 
                  onClick={this.handleCancelLoginClicked}>Cancelar</Button>

                <Button color='blue' size='small' style={{width: 90}} 
                  onClick={this.handleLoginButtonClicked}>Login</Button>
              </Form>
            </Segment>
          </Sidebar>

          <Sidebar.Pusher>
            <div className="App-intro">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/home" component={Home}/>
                <Route path="/clientes" component={Clients}/>
                <Route path="/imoveis" component={Properties}/>
                <Route path="/corretores" component={Agents}/>
                <Route path="/imobiliarias" component={Imobiliarias}/>
              </Switch>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        <footer className="App-footer">
          <h3>Aplicativo implementado pela iMob Soluções - versão {versao}</h3>
          <a href='https://github.com/jorgealmeidajr/imobprime-react' style={{color: 'white'}}>
            <Icon name='github' size='huge' />Acessar o código-fonte da aplicação
          </a>
        </footer>
      
    )
  }

}
