import { useUser } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export const AddBoardModal = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const user = useUser()

  const handleSubmit = async event => {
    event.preventDefault()

    const url = event.target.board.value.trim().replace(/\r?\n|\r/g, '')

    const data = {
      playUrl: url,
      userId: user.id,
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

      const createdPlay = await response.json()

      setShow(false)
    } catch (error) {
      console.error('Error creating game:', error)
      alert('An error occurred. Please try again later.')
    }
  }
  if (!user) {
    return (
      <Link
        href="/login"
        className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Login
      </Link>
    )
  }

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Add
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Register a played game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="addBoardForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>Submitting as</Form.Label>
                  <Form.Control
                    type="text"
                    value={user.user_metadata.username}
                    disabled
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="addBoardForm.ControlTextarea1">
              <Form.Label>Paste your board result here</Form.Label>
              <Form.Control as="textarea" rows={10} name="board" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
