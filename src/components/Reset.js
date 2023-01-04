import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { showErrorMessage } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import isEmpty from 'validator/lib/isEmpty';
import validator from 'validator'
import { forgotPassword } from '../api/auth';
import {BsArrowLeft} from "react-icons/bs"
import Alert from './Alert';

// resetmailtest07@gmail.com
const Reset = () => {
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState(null);
    const showAlert = (messsage, type) =>{
      setAlert({
        msg: messsage,
        type: type
      })
      setTimeout(() => {
        setAlert(null);
      }, 4000)
    }
  
    const handleForgotPassword = (e) => {
      console.log("forgotpassword")
      e.preventDefault();
      if (isEmpty(email)) {
        showAlert("Email Can't be empty", "danger")
      } 
      else if (validator.isEmail(email)) {
        forgotPassword({email})
        .then((response) => {
          console.log(response)
          setSuccess(true)
          showAlert(response.data.message, "success")
        })
        .catch((err) => {
          console.log(err)
        });
      }
    }
  return (
    <>
    <Alert alert={alert}/>
    <div className='log-sign-main border-top'>
    {!success &&<div className="login">
    <h1 className="text-center" style={{fontFamily: "'Open Sans', cursive"}}>BidOnBuy</h1>
    <div className='text-left pl-1 mt-5 '>
        <p className='text-dark font-weight-light h5 mb-2'>Enter the email address associated with your account and we'll send you a link to reset your password.</p>
    </div>
        <div className="form-outline mb-2">
          <input name='email' type="text" id="form3Example3cg" placeholder='Enter email address' value={email} className="form-control form-control-lg " style={{margin: "13px auto"}} required autoFocus onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="d-flex justify-content-center mb-2">
          <button type="submit" className="btn btn-block button glow mb-3" onClick={handleForgotPassword}><span className='font-weight-bold text-white'>Continue</span></button>
        </div>
        <Link to='/signin' className="font-weight-bold text-decoration-none h5 mt-5" ><BsArrowLeft className='mr-3'/>Return to sign in</Link>
    </div>
    }
    {success &&
    <div className="login ">
    <h1 className="text-center" style={{fontFamily: "'Open Sans', cursive"}}>BidOnBuy</h1>
    <p className='h2 text-dark text-left mt-5 font-weight-bold'> Thanks, check your email for instructions to reset your password</p>
    <p className='text-dark text-left mt-4 h5 font-weight-light'>If you haven't received an email in 5 minutes, check your spam or <Link className="font-weight-normal text-decoration-none h5" onClick={handleForgotPassword}>resend.</Link></p>
    </div>
    }
  </div>  
  </>)
}

export default Reset