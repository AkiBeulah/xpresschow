import axios from 'axios';
import authHeader from "./auth-header"

class CarrierService {
  getCarrierProfile(a) {
    return axios.get(authHeader.getApiUrl() + `${a}/profile`, {
      headers: authHeader.getHeader()
    })
  }

  dashBoard() {
    return axios.get(authHeader.getApiUrl() + `carrier/dashboard`, { headers: authHeader.getHeader() })
  }
  
  getJobs() {
    return axios.get(authHeader.getApiUrl() + `carrier/jobs`, { headers: authHeader.getHeader() })
  }

  registerJob(orderID, id) {
    return axios.post(authHeader.getApiUrl() + 'carrier/register_job',
      {
        order_id: orderID,
        carrier_id: id
      },
      {
        headers: authHeader.getHeader()
      })
  }

  delivered(orderID, id) {
    return axios.post(authHeader.getApiUrl() + 'carrier/toggle_delivered',
      {
        order_id: orderID
      },
      {
        headers: authHeader.getHeader()
      })
  }

  toggleDelivered(id) {
    axios.post(authHeader.getApiUrl() + 'carrier/toggle_delivered', { headers: authHeader.getHeader() })
  }
}

export default new CarrierService();