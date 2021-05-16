import React from 'react'
import Header from '../components/Header'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import Clients from '../components/Clients'
import Tickets from '../components/Tickets'
import Entries from '../components/Entries'
import MyEntries from '../components/MyEntries'
import MyTickets from '../components/MyTickets'

const Main = (props) => {
    const { handleLogOut, user, setUser, clients, getClients } = props
    let match = useRouteMatch()

    return (
        <>
            <Header handleLogOut={handleLogOut} user={user} />
            <Switch>
                {user.role === "admin" ? (
                    <>
                        <Route path={`${match.path}/clients`} render={(props) => <Clients user={user} setUser={setUser} clients={clients} getClients={getClients} />} />
                        <Route path={`${match.path}/tickets`} render={(props) => <Tickets user={user} setUser={setUser} clients={clients} getClients={getClients} />} />
                        <Route path={`${match.path}/entries`} render={(props) => <Entries user={user} setUser={setUser} clients={clients} getClients={getClients} />} />
                    </>
                ) : (
                    <>
                        <Route path={`${match.path}/tickets`} render={(props) => <MyTickets />} />
                        <Route path={`${match.path}/entries`} render={(props) => <MyEntries />} />
                    </>
                )}
            </Switch>
        </>
    )
}

export default Main
