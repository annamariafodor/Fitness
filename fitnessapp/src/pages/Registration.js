import React from 'react'
import Login from '../components/Login'

const Registration = (props) => {
    const { user, setUser, handleLogin, handleRegister, validUser } = props
    return (
        <Login user={user} setUser={setUser} handleLogin={handleLogin} handleRegister={handleRegister} validUser={validUser} />
    )
}

export default Registration
