class authHeader {
  getHeader() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      return {
        "Content-Type": "application/json",
        'Authorization': "" + token
      };
    } else {
      return {};
    }
  }

  getApiUrl() {
    // const API_URL = `http://localhost:3001/api/v1/`
    const API_URL = `https://xpresschow-api.herokuapp.com/api/v1/`  
    
    return API_URL;
  }
}

export default new authHeader();