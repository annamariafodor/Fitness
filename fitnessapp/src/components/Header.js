import { Navbar, Nav, Form, Button } from 'react-bootstrap'

const Header = (props) => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">FitnessApp</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#clients">Clients</Nav.Link>
                    <Nav.Link href="#ftickets">Tickets</Nav.Link>
                    <Nav.Link href="#entries">Entries</Nav.Link>
                </Nav>
                <Form inline>
                    <Button variant="outline-info" onClick = {() => props.handleLogOut()}>Log out</Button >
                </Form>
            </Navbar>
        </div>
    )
}

export default Header
    