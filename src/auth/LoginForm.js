import React, { useState } from 'react';
import axios from "axios";
import qs from "qs";

function LoginForm(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value)
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const user = {
      credential: email,
      password: password
    }
    axios.post(`http://localhost:3001/user/login`, qs.stringify(user))
      .then(
        resp => {
          localStorage.setItem("token", resp.data.token)
          props.handleLogin(resp.data.user)
        })
      .catch(error => {
      })

    setEmail("")
    setPassword("")
  }

  return (
    <div className="">
      <div className="card">
        <div className="card-body">
          <div className="col-md-12">
            <div className="btn btn-success disabled btn-lg btn-block">Login With Google</div>
          </div>
          <br />
          <div className="or-seperator text-center">OR</div>
          <br />
          <div className="col-md-12">
            <div className="alert bg-warning text-center">
              {error}
            </div>
          </div>
          <form className="row container" onSubmit={handleSubmit} >
            <div className="form-group col-md-12">
              <input type="email" value={email} onChange={handleEmailChange} className="form-control form-control-lg" required />
            </div>
            <div className="form-group col-md-12">
              <input type="password" value={password} onChange={handlePasswordChange} className="form-control form-control-lg" required />
            </div>
            <div className="col-md-12">
              <button className="btn btn-block btn-lg btn-outline-primary" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm