import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.0.128:5005/api',  // No trailing slash
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
