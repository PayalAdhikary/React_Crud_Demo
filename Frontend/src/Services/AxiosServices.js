import axios from 'axios';

export default class AxiosServices {
  post(url, data, isAuthRequired = false) {
    const headers = this.getHeaders(isAuthRequired);
    return axios.post(url, data, { headers });
  }

  get(url, isAuthRequired = false) {
    const headers = this.getHeaders(isAuthRequired);
    return axios.get(url, { headers });
  }

  put(url, data, isAuthRequired = false) {
    const headers = this.getHeaders(isAuthRequired);
    return axios.put(url, data, { headers });
  }

  // Helper function to get the headers
  getHeaders(isAuthRequired) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (isAuthRequired) {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (token) {
        headers['Authorization'] = `Bearer ${token}`; // Attach token to the Authorization header
      }
    }

    return headers;
  }
}
