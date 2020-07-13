import axios from "axios";
import qs from "qs";

const API_URL = `http://localhost:3001/api/v1/`
// const API_URL = `https://xpresschow-api.herokuapp.com/api/v1/`

class AuthService {
  login(credential, password) {
    const user = {
      credential: credential,
      password: password
    }

    return axios.post(API_URL + 'user/login', qs.stringify(user))
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

    return axios.post(API_URL + 'vendor/login', qs.stringify(vendor))
      .then(resp => {
        if (resp.data.token) {
          localStorage.setItem("token", resp.data.token)
          localStorage.setItem("consumer", resp.data.consumer)
          localStorage.setItem("user", JSON.stringify(resp.data.vendor))
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
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number
    }
    return axios.post(API_URL + `users`, qs.stringify(user))
      .then(resp => {
        if (resp.data.token) {
          localStorage.setItem("token", resp.data.token)
          localStorage.setItem("consumer", resp.data.consumer)
          localStorage.setItem("user", JSON.stringify(resp.data.vendor))
        }

        return resp.data
      })
  }

  vendorRegister(email, password, company_name, company_branch, phone_number, address, location, vendorname) {
    const user = {
      email: email,
      password: password,
      company_name: company_name,
      company_branch: company_branch,
      phone_number: phone_number,
      address: address,
      location: location,
      vendorname: vendorname
    }
    return axios.post(API_URL + `vendors`, qs.stringify(user))
  }

  getCurrentUser() {
    return localStorage.getItem("user")
  }
}

export default new AuthService();