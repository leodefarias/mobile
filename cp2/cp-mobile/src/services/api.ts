import axios from 'axios';

export interface QuoteResponse {
  id: number;
  quote: string;
  author: string;
}

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

export async function getRandomQuote(): Promise<QuoteResponse> {
  const response = await api.get<QuoteResponse>('/quotes/random');
  return response.data;
}

export default api;
