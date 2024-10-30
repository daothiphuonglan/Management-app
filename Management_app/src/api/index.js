
import axios from 'axios';

export const login = async (username, password) => {
  const response = await axios.get('http://localhost:4000/users'); 

  const user = response.data.find(user => user.username === username && user.password === password);
  if (user) {
    const token = `token_for_user_${user.id}`; 
    localStorage.setItem('token', token); 
    return token; 
  } else {
    throw new Error('Invalid credentials');
  }
};

export const checkToken = () => {
  const token = localStorage.getItem('token');
  return token ? token : false;
};
