import { Button, Form } from 'react-bootstrap'
import React, { useState } from 'react'

const Login = (props) => {
    const [hasAccount, setHasAccount] = useState(true);

    return (
        <div className="login">
            <Form className="loginContainer" >
                <h3>{hasAccount ? "Sign in" : "Create account"}</h3>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email" onChange={(e) => props.setUser({ ...props.user, email: e.target.value })} />
                </Form.Group>


                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" onChange={(e) => props.setUser({ ...props.user, password: e.target.value })} />
                </Form.Group>

                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                            <Button variant="primary" onClick={() => props.handleLogin(props.user)}>Login</Button>
                            <p onClick={() => setHasAccount(!hasAccount)}>Create account</p>
                        </>
                    ) : (
                        <>
                            <Button variant="primary" onClick = {() => props.handleRegister(props.user)}>Register</Button>
                            <p onClick={() => setHasAccount(!hasAccount)}>Log in</p>
                        </>
                    )
                    }
                </div>

            </Form>
        </div>
    )
}

export default Login