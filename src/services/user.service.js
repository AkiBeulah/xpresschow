import axios from 'axios';

import authHeader from "./auth-header"

class UserService {
  getPublicContent() {
    return axios.get(authHeader.getApiUrl() + 'vendors')
  }

  searchXpress(q) {
    return axios.get(authHeader.getApiUrl() + 'search', {
      params: {
        query: q
      }
    })
  }

  cancelAxios() {
    return axios.CancelToken.source();
  }

  filterByLocation(loc) {
    return axios.get(authHeader.getApiUrl() + 'f_vendor', {
      params: {
        location: loc
      }
    })
  }

  getVendor(v) {
    return axios.get(authHeader.getApiUrl() + 'vendors/' + v)
  }

  getUserProfile(a) {
    return axios.get(authHeader.getApiUrl() + `users/${a}`, {
      headers: authHeader.getHeader()
    })
  }

  getOrderRecord(a) {
    return axios.get(authHeader.getApiUrl() + `orders/${a}`, {
      headers: authHeader.getHeader()
    })
  }

  placeOrder(a, b, c, d, e, f, g, h) {
    const data = {
      user_id: a,
      vendor_id: b,
      location: h,
      address: c.toLowerCase(),
      payment_method: d,
      price: e,
      paid: f,
      orders: g
    }

    return axios.post(authHeader.getApiUrl() + 'orders',
      data,
      { headers: authHeader.getHeader() }
    )
  }
}


export default new UserService();