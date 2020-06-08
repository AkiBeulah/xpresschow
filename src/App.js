import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Header from './pages/Header'
import Footer from './pages/Footer'
import Home from './Home'
import Dashboard from './Dashboard'
import axios from "axios";

function App() {
    const [user, setUser] = useState({})
    useEffect(() => {
      const token = localStorage.getItem("token")
      if (token) {
        const headers = {
          'Authorization': token
        }

        axios.post(`http://localhost:3001/user/login`, { headers: headers })
          .then(resp => resp.json())
          .then(data => {
            setUser(data)
          })
      }
    }, [])

    const handleLogin = (user) => {
      setUser(user)
    }

    return (
      <>
        <Header handleLogin={handleLogin} user={user} />
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <Home user = {user} />
              )} />

            <Route
              exact
              path={"/dashboard"}
              render={props => (
                <Dashboard user={user} />
              )} />

          </Switch>
        </BrowserRouter>

        <div className="display-4">
              {user.first_name}
        </div>
        
        <Footer />
      </>
    );
  }

  export default App