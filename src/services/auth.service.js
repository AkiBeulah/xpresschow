import axios from "axios";
import qs from "qs";

const API_URL = `https://xpresschow-api.herokuapp.com/api/v1/`
// const API_URL = `http://localhost:3001/api/v1/`

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
    return axios.post(API_URL + `users`, qs.stringify(user))
  }

  getCurrentUser() {
    return localStorage.getItem("user")
  }
}

export default new AuthService();