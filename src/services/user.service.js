import axios from 'axios';

import authHeader from "./auth-header"

// const API_URL = 'https://xpresschow-api.herokuapp.com/api/v1/';
const API_URL = `http://localhost:3001/api/v1/`


class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'vendors')
  }

  searchXpress(q) {
    return axios.get(API_URL + 'search', {
      params: {
        query: q
      }
    })
  }

  cancelAxios() {
    return axios.CancelToken.source();
  }

  filterByLocation(loc) {
    return axios.get(API_URL + 'f_vendor', {
      params: {
        location: loc
      }
    })
  }

  getVendor(v) {
    return axios.get(API_URL + 'vendors/' + v)
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

  placeOrder(a, b, c, d, e, f, g) {
    localStorage.removeItem("cartTemp")
    return axios.post(API_URL + 'orders',
      {
          user_id: a,
          vendor_id: b,
          location: c,
          payment_method: d,
          price: e,
          paid: f,
          orders: g
      },
      {
        headers: authHeader()
      }
    )}
}


export default new UserService();