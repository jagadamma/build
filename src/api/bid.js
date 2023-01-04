import axios from 'axios';
export const placeBid = async (id,data) => {
    const config = {
      withCredentials: true,
    }
    const response = await axios.put(`/api/bid/${id}`, data, config);
    return response;
}

export const getUserBid = async () => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  }
  const response = await axios.get('/api/bid', config);
  return response;
}

export const acceptBid = async (data) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  }
  const response = await axios.post('/api/bid',data, config);
  return response;
}
export const getNotification = async () => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  }
  const response = await axios.get('/api/bid/notification', config);
  return response;
}
export const withDraw = async(data) => {
  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  }
  const response = await axios.post(`/api/bid/withdraw`, data, config);
  return response
}
export const reject = async(data) => {
  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  }
  const response = await axios.post(`/api/bid/reject`, data, config);
  return response
}