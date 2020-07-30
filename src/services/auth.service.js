import axios from "axios";
import qs from "qs";

import authHeader from "./auth-header"

class AuthService {
  login(credential, password) {
    const user = {
      credential: credential,
      password: password
    }

    return axios.post(authHeader.getApiUrl() + 'user/login', qs.stringify(user))
      .then(resp => {
        if (resp.data.token) {
          localStorage.setItem("token", resp.data.token)
          localStorage.setItem("consumer", resp.data.consumer)
          localStorage.setItem("user", JSON.stringify(resp.data.user))
        }

        return resp.data
      })
  }

  vendorLogin(credential, password) {
    const vendor = {
      credential: credential,
      password: password
    }

    return axios.post(authHeader.getApiUrl() + 'vendor/login', qs.stringify(vendor))
      .then(resp => {
        if (resp.data.token) {
          localStorage.setItem("token", resp.data.token)
          localStorage.setItem("consumer", resp.data.consumer)
          localStorage.setItem("user", JSON.stringify(resp.data.vendor))
        }

        return resp.data
      })
  }
  
  carrierLogin(credential, password) {
    const carrier = {
      credential: credential,
      password: password
    }

    return axios.post(authHeader.getApiUrl() + 'carrier/login', qs.stringify(carrier))
      .then(resp => {
        if (resp.data.token) {
          localStorage.setItem("token", resp.data.token)
          localStorage.setItem("consumer", resp.data.consumer)
          localStorage.setItem("user", JSON.stringify(resp.data.carrier))
        }

        return resp.data
      })
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("consumer")
  }

  register(email, password, first_name, last_name, phone_number) {
    const user = {
      email: email.toLowerCase(),
      password: password,
      first_name: first_name.toLowerCase(),
      last_name: last_name.toLowerCase(),
      phone_number: phone_number
    }
    return axios.post(authHeader.getApiUrl() + `users`, qs.stringify(user))
      .then(resp => {
        if (resp.data.token) {
          localStorage.setItem("token", resp.data.token)
          localStorage.setItem("consumer", resp.data.consumer)
          localStorage.setItem("user", JSON.stringify(resp.data.vendor))
        }

        return resp.data
      })
  }

  vendorRegister(logo, email, password, company_name, company_branch, phone_number, address, location, vendorname) {
    const vendor = {
      logo: logo,
      email: email.toLowerCase(),
      password: password,
      company_name: company_name.toLowerCase(),
      company_branch: company_branch.toLowerCase(),
      phone_number: phone_number,
      address: address.toLowerCase(),
      location: location.toLowerCase(),
      vendorname: vendorname
    }
    return axios.post(authHeader.getApiUrl() + `vendors`, qs.stringify(vendor))
  }
  
  carrierRegister(email, password, firstname, lastname, phone_number, address, location, carriername, vehicle_type) {
   const carrier = {
      email: email.toLowerCase(),
      password: password,
      first_name: firstname.toLowerCase(),
      last_name: lastname.toLowerCase(),
      phone_number: phone_number,
      address: address.toLowerCase(),
      location: location.toLowerCase(),
      carriername: carriername,
      vehicle_type: vehicle_type
    }
    return axios.post(authHeader.getApiUrl() + `carriers`, qs.stringify(carrier))
  }

  getCurrentUser() {
    return localStorage.getItem("user")
  }
}

export default new AuthService();