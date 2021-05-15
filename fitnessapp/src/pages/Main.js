import React from 'react'
import Header from '../components/Header'

const Main = (props) => {
    const {handleLogOut} = props
    return (
        <Header handleLogOut={handleLogOut}/>
    )
}

export default Main
