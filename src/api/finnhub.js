import axios from 'axios';

export default axios.create({
  baseURL: 'https://finnhub.io/docs/api/v1',
  headers: {
    Authorization: FINNHUB_API    
  }
})