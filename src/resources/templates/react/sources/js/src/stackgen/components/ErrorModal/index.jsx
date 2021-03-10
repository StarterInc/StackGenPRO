import React from 'react'
import { Button, Modal } from 'react-bootstrap'

import { FiAlertTriangle } from 'react-icons/fi'
import './errorModal.css'

const ErrorModal = props => {
  const { errorMessage, callback } = props
  
  return (
    <Modal
      show={true}
      className={'errorDialog'}
      title="Error"
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <FiAlertTriangle size={28} color="orange" /> Error
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={'errorDialogMessage'}>{errorMessage}</Modal.Body>
      <Modal.Footer>
        <Button
          variant={'info'}
          data-dismiss="alert"
          aria-label="Close"
          onClick={() => callback()}
        >
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ErrorModal
