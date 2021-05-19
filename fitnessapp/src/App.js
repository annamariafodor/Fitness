import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import Registration from './pages/Registration';
import Main from './pages/Main';

function App() {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [validUser, setValidUser] = useState(false);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    getClients()
    getUsers()
  }, [])

  const getClients = () => {
    axios.get('https://localhost:5001/clients').then((response) => {
      setClients(response.data)
    }).catch((error) => { console.log("getClients error", error) });
  }

  const getUsers = () => {
    axios.get('https://localhost:5001/users').then((response) => {
      setUsers(response.data)
    }).catch((error) => { console.log("getUsers error", error) });
  }

  const handleLogin = (user) => {
    if (!user.email || !user.password) {
      alert("Missing datas!")
    }
    else {
      axios.get('https://localhost:5001/users/GetUserByEmailAsync/' + user.email).then((response) => {
        if (user.password === response.data.password) {
          setValidUser(true)
          setUser(response.data)
        } else {
          setValidUser(false)
          alert("Wrong datas!")
        }
      }).catch((error) => { console.log("Login error", error) });
    }

  }

  const handleRegister = (user) => {
    // check if the client has a membership
    let checkClient = clients.filter(x => x.email === user.email)
    if(checkClient.length === 0){
      alert("Before creating an account please visit one of our fitness center!") 
      return
    }
    // check if the email already exist in users database
    let checkUser = users.filter(x => x.email === user.email)
    if(checkUser.length !==0){
      alert("The email already exists!")
      return
    }

    // if the email and password is valid 
    if (checkClient.length !== 0 && checkUser.length === 0 && user.password) {
      axios.post('https://localhost:5001/users', user).then((response) => {
        setUser(user)
        setValidUser(true)
      }).catch((error) => { console.log("Register error", error) })
    } else {
      setValidUser(false)
    }
  }

  const handleLogOut = () => {
    setUser([])
    setValidUser(false)
  }

  return (
    <Router>
      <Switch>
        <Route path="/" exact render={(props) =>
        (
          <Registration {...props} user={user} setUser={setUser} handleLogin={handleLogin} handleRegister={handleRegister} validUser={validUser} />
        )}
        />
        <Route path="/main" render={(props) =>
        (
          <>
            <Main handleLogOut={handleLogOut} user={user} setUser={setUser} clients={clients} getClients={getClients} />
          </>

        )} />
      </Switch>
    </Router>

  );
}

export default App;

