import { Navbar, Nav, Form, Button } from 'react-bootstrap'
import { Link, useRouteMatch } from 'react-router-dom';

const Header = (props) => {
    let match = useRouteMatch();
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Link to="/main">
                    <Navbar.Brand>FitnessApp</Navbar.Brand>
                </Link>
                {props.user.role === "admin" ? (
                    <Nav className="mr-auto navbar_wrapper">
                        <Link to={`${match.url}/clients`}>Clients</Link>
                        <Link to={`${match.url}/tickets`}>Tickets</Link>
                        <Link to={`${match.url}/entries`}>Entries</Link>
                    </Nav>
                ) : (
                    <Nav className="mr-auto navbar_wrapper">
                        <Link to={`${match.url}/tickets`}>My Tickets</Link>
                        <Link to={`${match.url}/entries`}>My Entries</Link>
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
