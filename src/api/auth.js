import axios from 'axios';
import '../axios';


export const signup = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
  }
  const response = await axios.post('/api/auth/signup', data, config);
  return response
}

export const signin = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
  }
  const response = await axios.post('/api/auth/signin', data, config);
  return response
}
export const profileUpdate = async (data) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,
    
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const response = await axios.post('/api/profile', data, config);
  return response
}

//changes for verification

export const verification = async (data) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,

    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post("/api/profile/verify", data, config);
  return response;
};

export const allVerifications = async () => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,

    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get("/api/profile/verifications", config);
  return response;
};

export const acceptVerification = async (userId) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,

    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(
    `/api/profile/accept/verifications/${userId}`,
    config
  );
  return response;
};

export const deleteVerification = async (verificationId) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,

    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(
    `/api/profile/delete/verification/${verificationId}`,
    config
  );
  return response;
};

export const forgotPassword = async (email) => {
  console.log(email)
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,

    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    `/api/auth/forgotpassword`, email, config);
  return response;
};
export const verifytoken = async (token) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,

    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(
    `/api/auth/resetPassword/${token}`,
    config
  );
  return response;
};
export const changePassword = async (token,data) => {
  console.log(data)
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const response = await axios.post(`/api/auth/${token}`, data, config);
  return response;
};
//for chat purposes
export const getLoggedInUser = async (id) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,

    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    "/api/profile/get/loggedin/user",
    { id },
    config
  );
  return response;
};
