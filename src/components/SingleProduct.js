import React, { useState, useEffect } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { createCategory, getCategories } from '../api/category'
import { getSingleProduct } from '../api/product'
import {placeBid} from '../api/bid'
import { isAuthenticated} from '../helpers/auth';
import Carousel from "react-material-ui-carousel";
import { createMessage } from "../api/message";
import { getLoggedInUser } from "../api/auth";
import Alert from './Alert';
import isEmpty from 'validator/lib/isEmpty';
const SingleProduct = () => {

  const [alert, setAlert] = useState(null);

  const showAlert = (messsage, type) =>{
    setAlert({
      msg: messsage,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }

  const navigate = useNavigate();
  const productId = useParams()
console.log(productId)
  const [loading, setLoading] = useState(false);
  const [p, setProduct] = useState('')
  const [categories, setCategories] = useState('')
  const [loggedInUser, setLoggedInUser] = useState(null);

  const chatHandler = (reciever) => {
    createMessage(reciever, loggedInUser && loggedInUser._id).then(function (
      message
    ) {
      console.log(message);
    });
  };

  useEffect(() => {
    loadProduct()
    getLoggedInUser().then(function (user) {
      setLoggedInUser(user.data);
    });
  }, [loading])

  const loadProduct = async () => {
    await getSingleProduct(productId.productId)
    .then((response) => {
      setProduct(response.data)
      console.log('product', response.data)
    }
    )
    .catch((error) => {
      console.log('loadProducts error', error)
    }
    )
  }

  const bid = async(e) =>{
    e.preventDefault();
    if(!isAuthenticated()){
      navigate("/signin");
    }
    else{
    if (isEmpty(document.getElementById("amount").value)){
      showAlert('Please fill Bid amount', "danger")
    }
    else{
    const amount = document.getElementById("amount").value;
    await placeBid(productId.productId,{amount:amount})
    .then((response) => {
      console.log(response.data.message)
      showAlert(response.data.message, "success")
      document.getElementById("amount").value = null;
    }
    )
    .catch((error) => {
      showAlert(error.response.data.error, "danger")
      document.getElementById("amount").value = null;
    }
    )
  }
}
  }
  useEffect(() => {
    loadCategories()
  }, [loading])

  const loadCategories = async () => {
    await getCategories()
    .then((response) => {
      setCategories(response.data)
      console.log('categories', response.data)
    }
    )
    .catch((error) => {
      console.log('loadCategories error', error)
    }
    )
  }

  return (
  <><Alert alert={alert}/>
  <div className='fullHeight'>
    <div className='homeHeading'>
            <NavLink><p className="homeHeading-p">How  It Works</p></NavLink>
            <NavLink><p className="homeHeading-p">Auction</p></NavLink>
            <NavLink><p className="homeHeading-p">Sell your product</p></NavLink>
            <NavLink><p className="homeHeading-p" style={{marginBottom: "0"}}>Services and Support</p></NavLink>
        </div>
        { p && <div className = "row singleproduct h-90 m-1 border border-bottom-0">
        <div className="carousel col col-md-8 p-3 border rounded border-bottom-0" style={{ height: "100%", width: "50%" }}>
              <Carousel className="d-flex justify-content-center align-items-center flex-column">
                {p.images &&
                  p.images.map((e, i) => (
                    <div
                      className="image-holder d-flex align-items-center justify-content-center"
                      style={{
                        height: "70vh",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      key={e.url}
                    >
                      <img
                        style={{
                          height: "100%",
                          widht: "100%",
                          objectFit: "cover",
                        }}
                        src={e.url}
                        alt={`${i} image`}
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
        <div className='col-sm col-md-4 border rounded border-white text-left pt-3 border-bottom-0'>
          <p className='h1'>{p.productName}</p>
          {/* <p className='text-secondary pt-2'>Minimum bid<span className="ml-4 text-white font-weight-bold" >Rs. {p.productPrice}</span></p> */}
          <hr />
          <div className="d-flex justify-content-around text-secondary pt-2">
              <p>Category</p> 
              <p>Location</p>
              <p>Year old</p>
          </div>
          <div className="d-flex justify-content-around">
              <p>{p.subCategory}</p> 
              <p>Delhi</p>
              <p>{p.year==0?"New":p.year}</p>
          </div>
          <p className="singleproducthr" ></p>
          {/* <p className="text-secondary">Minimum bid</p>
          <p className='h1 font-weight-bold'>Rs {p.productPrice}</p> */}
          <div className='text-center pt-5 pb-5'>
            <button className='btn btn-primary btn-lg w-75 rounded-pill font-weight-bold pt-3 pb-3' data-toggle='modal' data-target='#bidProduct' >Place a bid</button>
            {loggedInUser && loggedInUser._id == p.userId ? (
                  ""
                ) : (
                  <button
                    onClick={() => {
                      chatHandler(p.userId);
                      navigate(`/chat/${p.userId}`);
                    }}
                    className="btn mt-3 btn-warning btn-lg w-75 rounded-pill font-weight-bold pt-3 pb-3"
                    data-toggle="modal"
                    data-target="#bidProduct"
                  >
                    Chat
                  </button>
                )}
          </div>
          <p className='border-bottom text-center pt-3 pb-3'>Details</p>
          <p>{p.productDescription}</p>

        </div>
    </div>
  }
    </div>
    <div class="modal fade" id="bidProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div class="modal-dialog" >
    <div class="modal-content" style={{backgroundColor: "#1D1E20", color:"#fff"}}>
      <div class="modal-header">
        <h5 class="modal-title h1" id="exampleModalLabel">{p.productName}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" style={{color:"#fff"}}>&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="input-group input-group-lg">
  <div class="input-group-prepend border-white border-right ">
    <span class="input-group-text" id="inputGroup-sizing-lg" style={{backgroundColor: "#1D1E20", color:"#fff"}}>Amount in Rupees</span>
  </div>
  <input type="Number" id ="amount" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" min="1"/>
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-lg btn-outline-secondary" data-dismiss="modal" >Close</button>
        <button class="btn btn-lg btn-outline-primary" onClick={bid} data-dismiss="modal">Place Bid</button>
       
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default SingleProduct

{/* <div className="col-8 d-flex align-items-center justify-content-around border border-white pt-5 "> */
          /* <FaLessThan />
          <img className="rounded singleproduct-img" src ="/images/washingMachine.png" alt ="washing machine"/>
          <FaGreaterThan />
        </div> */}

        // style={{backgroundImage: "url(https://cdn-icons-png.flaticon.com/512/6416/6416962.png)"}}