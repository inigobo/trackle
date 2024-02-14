import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'

const LoginCardMenu = () => {
  return (
    <DropdownMenu>
      <LinkContainer to="/profile">
        <Nav.Link>Your profile</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/profile">
        <Nav.Link>Your profile</Nav.Link>
      </LinkContainer>
      <DropdownItem.Divider />
      <LinkContainer to="/profile">
        <Nav.Link>Your profile</Nav.Link>
      </LinkContainer>
    </DropdownMenu>
  )
}

export default LoginCardMenu
