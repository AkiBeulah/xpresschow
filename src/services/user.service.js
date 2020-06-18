import axios from 'axios';

import authHeader from "./auth-header"

const API_URL = 'http://localhost:3001/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'vendors')
  }

  getFilteredVendors(loc) {
    return axios.get(API_URL + 'f_vendor', {
      params: {
        location: loc
      }
    })
  }

  getVendor(vendor) {
    return axios.get(API_URL + 'vendors/' + vendor)
  }

  getUserProfile(a) {
    return axios.get(API_URL + `users/${a}`, {
      headers: authHeader()
    })
  }

  getOrderRecord(a) {
    return axios.get(API_URL + `orders/${a}`, {
      headers: authHeader()
    })
  }
}


export default new UserService();