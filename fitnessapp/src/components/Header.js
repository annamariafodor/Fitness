import { Navbar, Nav, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Link to="/main">
                    <Navbar.Brand>FitnessApp</Navbar.Brand>
                </Link>
                {props.user.role === "admin" ? (
                    <Nav className="mr-auto navbar_wrapper">
                        <Link to="/clients">Clients</Link>
                        <Link to="/tickets">Tickets</Link>
                        <Link to="/entries">Entries</Link>
                    </Nav>
                ) : (
                    <Nav className="mr-auto navbar_wrapper">
                        <Link to="/tickets">My Tickets</Link>
                        <Link to="/entries">My Entries</Link>
                    </Nav>
                )}

                <Form inline>
                    <Link to="/">
                        <Button variant="outline-info" onClick={() => props.handleLogOut()}>Log out</Button >
                    </Link>
                </Form>
            </Navbar>
        </div>
    )
}

export default Header
