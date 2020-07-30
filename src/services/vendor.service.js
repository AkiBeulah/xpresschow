import axios from 'axios';

import authHeader from "./auth-header"

class VendorService {
  getVendorProfile(a) {
    return axios.get(authHeader.getApiUrl() + `${a}/profile`, {
      headers: authHeader.getHeader()
    })
  }

  getVendorOrders(a) {
    return axios.get(authHeader.getApiUrl() + `vendor/${a}/orders`, {
      headers: authHeader.getHeader()
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
      authHeader.getApiUrl() + `vendors/${h}`,
      data,
      { headers: authHeader.getHeader() }
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
      authHeader.getApiUrl() + `vendor/${vendorname}/meals/new`,
      data,
      { headers: authHeader.getHeader() }
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
      authHeader.getApiUrl() + `vendor/${vendorname}/meals/update`,
      data,
      { headers: authHeader.getHeader() }
    )
  }

  destroyMeal(vendorname, id) {
    const data = {id: id}
    return axios.delete(authHeader.getApiUrl() + `vendor/${vendorname}/meals/destroy`, data, { headers: authHeader.getHeader() })
  }

  availabilityToggle(vendorname, id) {
    return axios({
      method: "patch",
      url: authHeader.getApiUrl() + `vendor/${vendorname}/meals/toggle`,
      headers: authHeader.getHeader(),
      params: {
        id: id
      }
    })
  }

  dispatchPrepared(vendorname, id) {
    return axios({
      method: "patch",
      url: authHeader.getApiUrl() + `vendor/${vendorname}/orders/prepared`,
      headers: authHeader.getHeader(),
      params: {
        id: id
      }
    })
  }
}


export default new VendorService();