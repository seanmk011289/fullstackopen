import axios from "axios";
const baseUrl = "http://localhost:5173/persons";

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

const editNumber = (p, newNumber) => {
  const url = `${baseUrl}/${p.id}`;
  const changedPerson = { ...p, number: newNumber };
  const put = axios.put(url, changedPerson);
  return put.then((response) => response.data);
  //   setNotes(notes.map((n) => (n.id === id ? response.data : n)));
  // });
};

export { getNumbers, addNumber, removeNumber, editNumber };
