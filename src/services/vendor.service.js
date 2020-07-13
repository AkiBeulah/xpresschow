import axios from 'axios';

import authHeader from "./auth-header"

const API_URL = `http://localhost:3001/api/v1/`
const IMG_URL = "https://api.imgbb.com/1/upload"
// const API_URL = 'https://xpresschow-api.herokuapp.com/api/v1/';


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

  vendorImageUpload(img) {
    var formData = new FormData()
    formData.append("image", img)
    formData.append("key", "2809495c110899fc67aed90f6cd96757")

    return axios({
      method: "post",
      url: IMG_URL,
      data: formData
    })
  }

  updateVendorDetails(a, b, c, d, e, f, g, h) {
    return axios({
      method: "patch",
      url: API_URL + `vendors/${h}`,
      headers: authHeader(),
      params: {
        logo: a,
        company_name: b,
        company_branch: c,
        email: d,
        phone_number: e,
        address: f,
        location: g
      }
    })
  }

  createMeal(vendorname, sample, name, price, sampleAlt, tag, discount, desc) {
    return axios({
      method: "post",
      url: API_URL + `vendor/${vendorname}/meals/new`,
      headers: authHeader(),
      params: {
        sample: sample,
        name: name,
        desc: desc,
        price: price,
        sample_alt: sampleAlt,
        tag: tag,
        discount: discount
      }
    })
  }

  updateMeal(vendorname, id, sample, name, price, sampleAlt, tag, discount, desc, available) {
    return axios({
      method: "patch",
      url: API_URL + `vendor/${vendorname}/meals/update`,
      headers: authHeader(),
      params: {
        id: id,
        name: name,
        sample: sample,
        price: price,
        sample_alt: sampleAlt,
        tag: tag,
        discount: discount,
        desc: desc,
        available: available
      }
    })
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