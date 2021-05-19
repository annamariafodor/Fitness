import React from 'react'
import Header from '../components/Header'
import { Route, useRouteMatch, Switch, Redirect } from 'react-router-dom'
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
            { user.length === 0 ? (<Redirect to="/" />) : null}
            <Header handleLogOut={handleLogOut} user={user} />
            <Switch>
                <Route path={`${match.path}`} exact render={() => (
                    <div className="mainPage">
                        <h1>Welcome back <b>{clients.filter(x => x.email === user.email)[0].name}!</b></h1>
                    </div>
                )}
                />
                {user.role === "admin" ? (
                    <>
                        <Route path={`${match.path}/clients`} render={(props) => <Clients user={user} setUser={setUser} clients={clients} getClients={getClients} />} />
                        <Route path={`${match.path}/tickets`} render={(props) => <Tickets user={user} setUser={setUser} clients={clients} getClients={getClients} />} />
                        <Route path={`${match.path}/entries`} render={(props) => <Entries user={user} setUser={setUser} clients={clients} getClients={getClients} />} />
                    </>
                ) : (
                    <>
                        <Route path={`${match.path}/tickets`} render={(props) => <MyTickets user={user} setUser={setUser} clients={clients} getClients={getClients} />} />
                        <Route path={`${match.path}/entries`} render={(props) => <MyEntries user={user} setUser={setUser} clients={clients} getClients={getClients} />} />
                    </>
                )}
            </Switch>
        </>
    )
}

export default Main
