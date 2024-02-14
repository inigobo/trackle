import { useUser } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { AddBoardModal } from '../AddBoardModal'
import { LoginCard } from '../LoginCard'

export const HeaderNav = () => {
  const user = useUser()

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Trackle</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link as={Link} href="/leaderboard" passHref>
                Leaderboard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>{user && <AddBoardModal />}</Nav.Item>
          </Nav>
          <Nav>
            <LoginCard />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
