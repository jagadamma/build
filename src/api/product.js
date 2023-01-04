import axios from 'axios';


export const createProduct = async (data) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  }
  const response = await axios.post('/api/product', data, config);
  return response;
}

export const getProduct = async () => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  }
  const response = await axios.get('/api/product', config);
  return response;
}
export const getSingleProduct = async (id) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  }
  const response = await axios.get(`/api/product/${id}` , config);
  return response;
}
export const getUserProduct = async () => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  }
  const response = await axios.get('/api/product/currentUser', config);
  return response;
}


export const deleteProduct = async (id) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  }
  const response = await axios.delete(`/api/product/${id}`, config);
  return response;
}

export const updateProduct = async (productId, data) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  }
  const response = await axios.put(`/api/product/${productId}`, data, config);
  return response;
}
export const searchAndRefine = async (location, search,page=1,mainCategory="", subCategory="", year="", sort="asc") => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  }
  const response = await axios.get(`/api/search/?location=${location}&search=${search}&category=${mainCategory}&subCategory=${subCategory}&year=${year}&sort=${sort}&page=${page}`, config);
  return response;
}