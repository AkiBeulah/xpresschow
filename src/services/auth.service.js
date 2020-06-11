import axios from "axios";
import qs from "qs";

const API_URL = `http://localhost:3001/user/login/`

class AuthService {
  login(credential, password) {
    const user = {
      credential: credential,
      password: password
    }

    return axios.post(API_URL, qs.stringify(user))
      .then(resp => {
        if (resp.data.token) {
          localStorage.setItem("token", resp.data.token)
          localStorage.setItem("user", JSON.stringify(resp.data.user))
        }

        return resp.data
      })
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  register(email, password, first_name, last_name, phone_number) {
    const user = {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number
    }
    return axios.post(`http://localhost:3001/users`, qs.stringify(user))
  }

  getCurrentUser() {
    return localStorage.getItem("user")
  }
}

export default new AuthService();