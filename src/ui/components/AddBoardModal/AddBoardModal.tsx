import { useRouter } from 'next/router'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

type AddBoardModalProps = {
  userId: string
}

export const AddBoardModal = ({ userId }: AddBoardModalProps) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const url = (event.target as HTMLFormElement).board.value

    const data = {
      playUrl: url,
      userId,
    }

    try {
      const response = await fetch('/api/play/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      setShow(false)
      router.reload()
    } catch (error) {
      console.error('Error creating game:', error)
      alert('An error occurred. Please try again later.')
    }
  }

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Añadir partida
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar una partida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="addBoardForm.ControlTextarea1">
              <Form.Label>Pega el link de tu tablero aquí</Form.Label>
              <Form.Control as="textarea" rows={10} name="board" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Añadir
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
