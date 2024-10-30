import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const postCreateTask = (name, description, status, deadline) => {
  return axios.post(`${apiUrl}/tasks`, {
    name,
    description,
    status,
    deadline,
  });
};

const updateTask = (id, name, description, status, deadline) => {
  return axios.put(`${apiUrl}/tasks/${id}`, {
    name,
    description,
    status,
    deadline,
  });
};

const deleteTask = (id) => {
  return axios.delete(`${apiUrl}/tasks/${id}`);
};

export { postCreateTask, updateTask, deleteTask };
