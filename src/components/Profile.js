import React, { useContext, useState, useEffect } from "react";
import { profileUpdate, verification } from "../api/auth";
import isEmpty from "validator/lib/isEmpty";
import validator from 'validator'
import { getLocalStorage } from "../helpers/localStorage";
import { setLocalStorage } from "../helpers/localStorage";
import { BsArrowRightSquare } from "react-icons/bs";
import { VscUnverified } from "react-icons/vsc";
import Camera from "./Camera";
const Profile = () => {
  const [imageInputValue, setImageInputValue] = useState(null);
  const [aadhar, setaadhar] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [cameraUrl, setCameraUrl] = useState(null);
  function handleisShown() {
    setIsShown(!isShown);
  }

  const pre_user = getLocalStorage("user");
  const [user, setUser] = useState({
    name: pre_user.name,
    phoneNr: pre_user.phoneNr,
    address: pre_user.address,
    email: pre_user.email,
    location: pre_user.location,
  });
  console.log(user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    const { name, phoneNr, address, email, location } = user;
    // var str = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (isEmpty(name) || isEmpty(email) || isEmpty(location)) {
      alert("Please fill all required field");
    } else if (validator.isEmail(email)) {
      const _id = pre_user._id;
      const role = pre_user.role;
      const accStatus = pre_user.accStatus;
      const data = { _id, name, phoneNr, address, email, location };
      profileUpdate(data)
        .then((response) => {
          console.log("Axios profile update success", response);
          setLocalStorage("user", { role, accStatus, ...data });
        })
        .catch((err) => {
          console.log("Axios profile update error", err);
        });
    }
  };
  let verifySubmitHandler = (e) => {
    e.preventDefault();
    if (cameraUrl && aadhar) {
      console.log(cameraUrl);
      console.log(aadhar);
      verification({ profileImage: cameraUrl, aadhar });
    } else {
      alert("We require your image and your aadhar card for verifying!!");
    }
  };
  let imageChangeHandler = (e) => {
    setImageInputValue(e.target.value);

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setaadhar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.value);
  };
  return (
    <>
      {" "}
      {!pre_user.accStatus && (
        <div className="verify rounded-bottom-lg bg-success text-white text-center h2  p-2">
          <VscUnverified />
          <p className="text-monospace pl-2 pr-5">Verify Your Identity</p>{" "}
          <BsArrowRightSquare onClick={handleisShown} className="verfiyArrow" />
        </div>
      )}
      {isShown && (
        <div className="container mt-5">
          <form onSubmit={verifySubmitHandler}>
            <div
              className="row justify-content-md-center"
              style={{
                color: "black",
                backgroundImage:
                  "-webkit-linear-gradient(75deg, #e7ecfd 45%,#80b3ff 40%)",
              }}
            >
              <div className="col-md-6 text-center pb-3 border border-secondary rounded pt-3">
                <Camera setCameraUrl={setCameraUrl} />
              </div>
              <div class="col-md-6 pt-5 border border-secondary rounded">
                <p className="pb-3 font-weight-light h2">
                  Upload your 
                  <span className="font-weight-bold">Aadhar Card</span>
                </p>
                <div class="custom-file mb-5">
                  <input
                    onChange={imageChangeHandler}
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    autofocus
                  />
                  <label class="custom-file-label" for="inputGroupFile04">
                    {imageInputValue ? imageInputValue : "Choose file"}
                  </label>
                </div>
              </div>
            </div>
            <div className="text-center mt-5">
              <button type="submit" class="btn-lg btn-outline-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      <div
        className="container rounded bg-white mt-5 mb-5"
        style={{
          color: "black",
          backgroundImage:
            "-webkit-linear-gradient(65deg, #e7ecfd 45%,#80b3ff 40%)",
        }}
      >
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mb-4"
                width="200px"
                src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"
              />
              <span className="fw-bold h1 text-info text-opacity-50">
                {user.name}
              </span>
              <span className="text-black-50 h3">{user.phoneNr}</span>
            </div>
          </div>
          <div className="col-md-6 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-semibold h2">Profile Settings</h4>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label className="labels mb-2 h4">Name**</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels mb-2 h4">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter phone number"
                    name="phoneNr"
                    value={user.phoneNr}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels mb-2 mt-2 h4">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter complete address"
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels mb-2 mt-2 h4">Email ID**</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter email id**"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    onClick={() =>
                      (document.getElementById(
                        "phoneNrValidation"
                      ).style.display = "none")
                    }
                    required
                  />
                </div>
                <p id="phoneNrValidation">Not a valid Email</p>
              </div>
              {/* <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels mb-2 mt-2 h4">
                    State/Location**
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="state"
                    name="location"
                    value={user.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div> */}
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button fw-bold px-4"
                  type="button"
                  onClick={PostData}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
