import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState([]);
  const [validUser, setValidUser] = useState(false);

  axios.defaults.withCredentials = true;

  const handleLogin = (user) => {
    axios.get('https://localhost:5001/users/GetUserByEmailAsync/' + user.email).then((response) => {
      if(user.password === response.data.password){
        setValidUser(true)
        setUser(response.data)
      } else {
        validUser = false
      }
    }).catch((error) => { console.log("Login error", error) });
  }

  const handleRegister = (user) => {
    axios.post('https://localhost:5001/users', user).then((response) => {
      setValidUser(true)

    }).catch((error) => { console.log("Register error", error) });
  }

  const handleLogOut = () => {
    setUser([])
    setValidUser(false)
  }


  return (
    <div className="App">
      {validUser ? (<Header handleLogOut={handleLogOut} />) : (<Login user={user} setUser={setUser} handleLogin={handleLogin} handleRegister={handleRegister} />)}
      {/* <Login user={user} setUser={setUser} handleLogin={handleLogin} />) */}
    </div>
  );
}

export default App;
