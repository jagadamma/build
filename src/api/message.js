import axios from "axios";

const config = {
  // baseURL: "http://localhost:5000/",
  withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
};

export const createMessage = async (reciever, loggedInUser) => {
  let message = await axios.post(
    "/api/message/create/message",
    {
      reciever,
      loggedInUser,
    },
    config
  );
  return message;
};

export const getMessages = async (id) => {
  let message = await axios.get(`/api/message/get/messages/${id}`, config);
  return message;
};

export const getAllMessages = async () => {
  let allMessage = await axios.get("/api/message/all/message", config);
  return allMessage;
};
