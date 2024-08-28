import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getNumbers = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addNumber = (newObject) => {
  const add = axios.post(baseUrl, newObject);
  return add.then((response) => response.data);
};

const removeNumber = (id) => {
  const remove = axios.delete(`${baseUrl}/${id}`);
  return remove.then((response) => response.data);
};

export { getNumbers, addNumber, removeNumber };
