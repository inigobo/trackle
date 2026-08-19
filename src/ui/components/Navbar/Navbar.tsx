import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { AddBoardModal } from '../AddBoardModal'
import { CreateGroupModal } from '../CreateGroupModal'
import { LoginCard } from '../LoginCard'

type HeaderNavProps = {
  user: User
}

export const HeaderNav = ({ user }: HeaderNavProps) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Trackle</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link as={Link} href="/leaderboard/" passHref>
                Clasificación
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>{user && <AddBoardModal userId={user.id} />}</Nav.Item>
            <Nav.Item>{user && <CreateGroupModal userId={user.id} />}</Nav.Item>
          </Nav>
          <Nav>
            <LoginCard user={user} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
