import axios from 'axios';

import authHeader from "./auth-header"

const API_URL = `http://localhost:3001/api/v1/`
// const API_URL = `https://xpresschow-api.herokuapp.com/api/v1/`


class VendorService {
  getVendorProfile(a) {
    return axios.get(API_URL + `${a}/profile`, {
      headers: authHeader()
    })
  }

  getVendorOrders(a) {
    return axios.get(API_URL + `vendor/${a}/orders`, {
      headers: authHeader()
    })
  }

  updateVendorDetails(a, b, c, d, e, f, g, h) {
    const data = {
      logo: a,
      company_name: b.toLowerCase(),
      company_branch: c.toLowerCase(),
      email: d.toLowerCase(),
      phone_number: e,
      address: f.toLowerCase(),
      location: g.toLowerCase()
    }
    
    return axios.patch(
      API_URL + `vendors/${h}`,
      data,
      { headers: authHeader() }
    )
  }

  createMeal(vendorname, sample, name, price, sampleAlt, tag, discount, desc) {
    const data = {
      sample: sample,
      name: name.toLowerCase(),
      desc: desc,
      price: price,
      sample_alt: sampleAlt.toLowerCase(),
      tag: tag.toLowerCase(),
      discount: discount
    }
    return axios.post(
      API_URL + `vendor/${vendorname}/meals/new`,
      data,
      { headers: authHeader() }
    )
  }

  updateMeal(vendorname, id, sample, name, price, sampleAlt, tag, discount, desc) {
    const data =  {
      id: id,
      name: name.toLowerCase(),
      sample: sample,
      price: price,
      sample_alt: sampleAlt.toLowerCase(),
      tag: tag.toLowerCase(),
      discount: discount,
      desc: desc
    }
    
    return axios.patch(
      API_URL + `vendor/${vendorname}/meals/update`,
      data,
      { headers: authHeader() }
    )
  }

  destroyMeal(vendorname, id) {
    const data = {id: id}
    return axios.delete(API_URL + `vendor/${vendorname}/meals/destroy`, data, { headers: authHeader() })
  }

  availabilityToggle(vendorname, id) {
    return axios({
      method: "patch",
      url: API_URL + `vendor/${vendorname}/meals/toggle`,
      headers: authHeader(),
      params: {
        id: id
      }
    })
  }

  dispatchToggle(vendorname, id) {
    return axios({
      method: "patch",
      url: API_URL + `vendor/${vendorname}/orders/dispatch`,
      headers: authHeader(),
      params: {
        id: id
      }
    })
  }
}


export default new VendorService();