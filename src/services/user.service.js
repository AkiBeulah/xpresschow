import axios from 'axios';
// import qs from "qs";

// import authHeader from './auth-header';

const API_URL = 'http://localhost:3001/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'vendors')
  }

  getFilteredVendors(loc) {
    const feed = {
      location: loc
    }
    // return axios.get(`http://localhost:3001/f_vendor?location=${loc}`)
    return axios.get('http://localhost:3001/f_vendor', {
      params: {
        location: loc
      }
    })
  }
}

export default new UserService();