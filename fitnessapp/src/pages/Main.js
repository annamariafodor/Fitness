import React from 'react'
import Header from '../components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Clients from '../components/Clients'
import Tickets from '../components/Tickets'
import Entries from '../components/Entries'
import MyEntries from '../components/MyEntries'
import MyTickets from '../components/MyTickets'

const Main = (props) => {
    const { handleLogOut, user, setUser, clients, getClients } = props
    return (
        <Router>
            <Header handleLogOut={handleLogOut} user={user} />
            {user.role === "admin" ? (
                <>
                    <Route path="/clients" render={(props) => <Clients user={user} setUser={setUser} clients={clients} getClients={getClients}/>} />
                    <Route path="/tickets" render={(props) => <Tickets user={user} setUser={setUser} clients={clients} getClients={getClients}/>} />
                    <Route path="/entries" render={(props) => <Entries user={user} setUser={setUser} clients={clients} getClients={getClients}/>} />
                </>
            ) : (
                <>
                    <Route path="/tickets" render={(props) => <MyTickets />} />
                    <Route path="/entries" render={(props) => <MyEntries />} />
                </>
            )}


        </Router>
    )
}

export default Main
