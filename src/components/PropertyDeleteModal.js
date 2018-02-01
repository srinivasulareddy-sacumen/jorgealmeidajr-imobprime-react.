
import React from 'react'

import { Modal, Header, Button } from 'semantic-ui-react'

const PropertyDeleteModal = (props, context) => {
  return (
    <Modal 
      size='small' dimmer
      open={props.deleteModalVisible} 
      onClose={props.closeDeleteModal}
    >
      <Modal.Header>Confirmar Remoção do Imóvel</Modal.Header>
      <Modal.Content>
        {
          props.property !== null &&
          <Header as='h4' dividing>
            Deseja mesmo remover o Imóvel ({props.property.id}) selecionado ?
          </Header>
        }
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={props.closeDeleteModal}>Não</Button>
        <Button color='red' onClick={props.delete}>Sim</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default PropertyDeleteModal
