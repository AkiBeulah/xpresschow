import axios from 'axios'

import authHeader from './auth-header'

const API_URL = 'https://xpresschow-api.herokuapp.com/';

class CheckoutService {
  placeOrder(a, b, c, d, e, f, g) {
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

export default new CheckoutService();