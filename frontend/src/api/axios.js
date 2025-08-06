import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5005/api',  // No trailing slash
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
