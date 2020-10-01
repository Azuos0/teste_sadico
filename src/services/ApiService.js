import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://geek-jokes.sameerkumar.website',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default {
  //faz a comunicação com a api das piadas e retorna uma piada
  async getJoke() {
    return (await apiClient.get('/api?format=json')).data;
  },
};