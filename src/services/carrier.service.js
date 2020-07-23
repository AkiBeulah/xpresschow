import axios from 'axios';
import authHeader from "./auth-header"

const API_URL = `https://xpresschow-api.herokuapp.com/api/v1/`
// const API_URL = `http://localhost:3001/api/v1/`

class CarrierService {
  getCarrierProfile(a) {
    return axios.get(API_URL + `${a}/profile`, {
      headers: authHeader()
    })
  }

  dashBoard() {
    return axios.get(API_URL + `carrier/dashboard`, { headers: authHeader() })
  }
  
  getJobs() {
    return axios.get(API_URL + `carrier/jobs`, { headers: authHeader() })
  }

  registerJob(orderID, id) {
    return axios.post(API_URL + 'carrier/register_job',
      {
        order_id: orderID,
        carrier_id: id
      },
      {
        headers: authHeader()
      })
  }

  delivered(orderID, id) {
    return axios.post(API_URL + 'carrier/toggle_delivered',
      {
        order_id: orderID
      },
      {
        headers: authHeader()
      })
  }

  toggleDelivered(id) {
    axios.post(API_URL + 'carrier/toggle_delivered', { headers: authHeader() })
  }
}

export default new CarrierService();