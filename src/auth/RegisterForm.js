import React, { useState } from 'react';
import axios from "axios";
import qs from "qs";

function RegisterForm(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [first_name, setFirst] = useState("")
  const [last_name, setLast] = useState("")
  const [phone_number, setPhone] = useState("")

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value)
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value)
  }

  const handlePhoneChange = (evt) => {
    setPhone(evt.target.value)
  }

  const handleFirstChange = (evt) => {
    setFirst(evt.target.value)
  }

  const handleLastChange = (evt) => {
    setLast(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const user = {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number
    }
    axios.post(`http://localhost:3001/users`, qs.stringify(user)).then(
      response => {
        console.log("Response: ", response)
      }
    ).catch(error => {
      console.log("error: ", error)
    })

    setEmail("")
    setPassword("")
    setFirst("")
    setLast("")
    setPhone("")
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="col-md-12">
            <div className="btn btn-success disabled btn-lg btn-block">Sign Up With Google</div>
          </div>
          <br />
          <div className="text-center">OR</div>
          <br />

          <form className="row container" onSubmit={handleSubmit} >
            <div className="form-group col-md-6">
              <input type="text" value={first_name} onChange={handleFirstChange} className="form-control form-control-lg" placeholder="First Name" required />
            </div>
            <div className="form-group col-md-6">
              <input type="text" value={last_name} onChange={handleLastChange} className="form-control form-control-lg" placeholder="Last Name" required />
            </div>
            <div className="form-group col-md-12">
              <input type="email" value={email} onChange={handleEmailChange} className="form-control form-control-lg" placeholder="Email" required />
            </div>
            <div className="form-group col-md-12">
              <input type="password" value={password} onChange={handlePasswordChange} className="form-control form-control-lg" placeholder="Password" required />
            </div>
            <div className="form-group col-md-12">
              <input type="phone" value={phone_number} onChange={handlePhoneChange} className="form-control form-control-lg" placeholder="Phone Number" required />
            </div>

            <div className="form-group col-md-12">
              <input type="checkbox" className="form-check" /> Please send me newsletters and promo deals
            </div>

            <div className="form-group col-md-12"> 
              <input type="checkbox" className="form-check" required /> Yes, I have read and accepted the Terms and conditions and the Privacy policy
            </div>

            <div className="col-md-12">
              <button className="btn btn-block btn-lg btn-outline-primary" type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterForm