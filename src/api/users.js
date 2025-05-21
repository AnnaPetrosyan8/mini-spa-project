import axios from 'axios';

export async function getUsers() {
  const url = 'https://jsonplaceholder.typicode.com/users'
  const response = await axios.get(url)
  return response.data
}
