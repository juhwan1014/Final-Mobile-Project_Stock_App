import axios from 'axios';
import { FINNHUB_API } from '@env';

export async function getSymbolPrice(input) {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${input}&token=${FINNHUB_API}`
    );
    //console.log('API RESPONSE:', response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
