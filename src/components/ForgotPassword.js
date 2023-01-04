import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { showErrorMessage } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { verifytoken, changePassword } from '../api/auth';
import {BsArrowLeft} from "react-icons/bs"
import { Triangle } from  'react-loader-spinner'
import Alert from './Alert';

const ForgotPassword = () => {

  const { token } = useParams();
  const history = useNavigate();

  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
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

  const userValid = async () => {
    verifytoken(token)
    .then((response) => {
      console.log("hey")
      showAlert(response.data.message, "success")
      setLoading(!loading)
    })
    .catch((err) => {
      history("*")
    });
}

  useEffect(() => {
    userValid()
  }, [])


  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (isEmpty(password) || isEmpty(password2)) {
      showAlert("Both fields are compulsory", "danger")
    } 
    else if (!equals(password, password2)) {
      showAlert("Passwords does not match", "danger")
    }
    else{
      changePassword(token,{password})
      .then((response) => {
        showAlert(response.data.message, "success")
        history("/signin")
      })
      .catch((err) => {
        showAlert(err.response.data.error, "success")
      });
    
    }
  }
return (
  <>
  <Alert alert={alert}/>
  { !loading &&
  <div className='log-sign-main border-top text-dark'>
  <Triangle
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
/>
</div>
  }
{loading &&
  <div className='log-sign-main border-top text-dark'>
  <div className="login">
  <h1 className="text-center" style={{fontFamily: "'Open Sans', cursive"}}>BidOnBuy</h1>
  <div className='text-left pl-1 mt-5 mb-5'>
      <p className='text-dark font-weight-bold h2 mb-2'>Reset your password</p>
  </div>
  <div className="form-outline mb-2">
    <label className="form-label float-left font-weight-normal h5 ml-1 mb-3" htmlFor="form3Example4cg">New Password</label>
    <input name='password' value={password} onChange = {(e) => setPassword(e.target.value)} type="password" id="form3Example4cg" placeholder='New Password' className="form-control form-control-lg" required/>
  </div>
  <div className="form-outline mb-2">
    <label className="form-label float-left font-weight-normal h5 ml-1 mb-3  mt-4" htmlFor="form3Example4cdg">Confirm password</label>
    <input name='password2' value={password2} onChange = {(e)=> setPassword2(e.target.value)} type="password" id="form3Example4cdg" placeholder='Confirm Password' className="form-control form-control-lg" required/>
  </div>
      <div className="d-flex justify-content-center mb-2">  ``
        <button type="submit" className="btn btn-block button glow mb-3" onClick={handlePasswordChange}><span className='font-weight-bold text-white'>Continue</span></button>
      </div>
      <Link to='/signin' className="font-weight-bold text-decoration-none h5 mt-5" ><BsArrowLeft className='mr-3'/>Return to sign in</Link>
  </div>

</div>  
}
</>)
}

export default ForgotPassword