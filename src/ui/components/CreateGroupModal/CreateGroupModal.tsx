import { getGroupAvatarSGV } from '@/src/services/apiCalls'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Col, Form, Image, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

type CreateGroupModalProps = {
  userId: string
}

export const CreateGroupModal = ({ userId }: CreateGroupModalProps) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const router = useRouter()

  const [avatarSeed, setAvatarSeed] = useState(
    (Math.random() + 1).toString(36).substring(7)
  )

  const handleRegenerateAvatar = () => {
    setAvatarSeed((Math.random() + 1).toString(36).substring(7))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const groupName = (event.target as HTMLFormElement).groupName.value

    const requestData = {
      groupName,
      avatarSeed,
      userId,
    }

    try {
      const response = await fetch('/api/group/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      setShow(false)
      router.reload()
    } catch (error) {
      console.error('Error creating group:', error)
      alert('An error occurred. Please try again later.')
    }
  }

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Crear grupo
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Crear un grupo nuevo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="addBoardForm.ControlInput1">
              <Row>
                <Col>
                  <Image
                    src={getGroupAvatarSGV(avatarSeed)}
                    alt={`Option seed ${avatarSeed}`}
                    height={80}
                    width={80}
                  />
                </Col>
                <Button onClick={handleRegenerateAvatar}>Regenerar</Button>
                <Col>
                  <Form.Label>Nombre del grupo</Form.Label>
                  <Form.Control type="text" name="groupName" />
                </Col>
              </Row>
            </Form.Group>
            <Button variant="primary" type="submit">
              Crear
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
