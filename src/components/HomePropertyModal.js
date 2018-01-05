
import React from 'react'

import { Modal, Grid, Header, Button, Image } from 'semantic-ui-react'

const HomePropertyModal = (props) => {
  return (
    <Modal 
      size='large' dimmer={false} 
      open={props.open} 
      onClose={props.onClose}>
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
        <Button negative onClick={props.onClose}>Fechar</Button>
      </Modal.Actions>
    </Modal>
  )
} 

export default HomePropertyModal