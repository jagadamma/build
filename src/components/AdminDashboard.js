import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment';
import isEmpty from 'validator/lib/isEmpty';
import { createCategory, getCategories } from '../api/category'
import { createProduct, getProduct, deleteProduct, updateProduct } from '../api/product'
import { showErrorMessage, showSuccessMessage } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import {MdDashboard} from "react-icons/md"
import {getUserBid, acceptBid, withDraw, reject} from '../api/bid'
import {getLocalStorage} from "../helpers/localStorage"
import Alert from './Alert';
import {CgProfile} from "react-icons/cg"
import {CategoryData} from "../helpers/categoryData"
import {LocationData} from "../helpers/StateAndCity"

//changes for verification
import { acceptVerification, allVerifications,deleteVerification } from "../api/auth";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [hideshow, setHideShow] = useState(true)
  const [category , setCategory] = useState('')
  const [categories, setCategories] = useState('')
  const [products, setProduct] = useState('')
  const [bidProducts, setBidProducts] = useState('')
  const [images, setImages] = useState([]);
  const [used, setUsed] = useState('new');
  const [alert, setAlert] = useState(null);
  const [mainCategory, setMainCategory] = useState("")
  const [disSubCategory, setSubCategory] = useState([])
  const [state, setState] = useState("");
  const [cityArr, setCityArr] = useState([])
  const [city, setCity] = useState("")
  //changes for verification
  const [showVeri, setShowVeri] = useState(false);
  const [pendingVerification, setPendingVerification] = useState();

  const showAlert = (messsage, type) =>{
    setAlert({
      msg: messsage,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }



  const [productData, setProductData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    subCategory: '',
    year: 0
  })
  function usedChange(e){
    setUsed(document.getElementById("usedAndNew").value)
    if (document.getElementById("usedAndNew").value=="new"){
     productData.year = 0;
    }
   }
  const handleMajorCategoryChange=(index) =>{
    if (index.target.value == ""){
      setMainCategory("")
      setSubCategory([])
    }
    else{

      setMainCategory(CategoryData[index.target.value].title)
      setSubCategory(CategoryData[index.target.value].subNav)
    }
  }
  const handleStateChange=(index) =>{
    if (index.target.value == ""){
      setState("")
      setCityArr([])
    }
    else{
    setState(LocationData[index.target.value].state)
    setCityArr(LocationData[index.target.value].districts)
    }
  }

  const {productName, productDescription, productPrice, subCategory, year} = productData;

  const handleProductImage = (e) => {
    // setProductData({ ...productData, productImage: e.target.files[0] });
    const imageMimeType = /image\/(png|jpg|jpeg|jfif|webp)/i;
    const files = Array.from(e.target.files);
    setImages([]);
    files.forEach((file) => {
      if (!file.type.match(imageMimeType)) {
        alert("Image type is not valid");
        e.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
    console.log(images)
  };

  // const handleProductImage = (e) => {
  //   console.log(e.target.files[0])
  //   setProductData({...productData, productImage: e.target.files[0]})
  // }

  const handleProductChange = (e) => {
    setProductData({...productData, [e.target.name]: e.target.value})
    console.log(productData)
  }

  const handleProductSubmit = (e) => {
    console.log("submitted");
    e.preventDefault();
    if (images.length==0 || isEmpty(productName) || isEmpty(productDescription) || isEmpty(mainCategory) || isEmpty(subCategory)  || isEmpty(state) || isEmpty(city)){
      showAlert('Please fill all fields', "danger")
    } 
    
    else if (year<0){
      showAlert('Year cannot be negative', "danger")
    }
    else {
      let formData = new FormData();
      let productImage = [];
      console.log(images);
      images.forEach((i) => {
        productImage.push(i);
      });
      createProduct({
        productName,
        productDescription,
        state,
        city,
        mainCategory,
        subCategory,
        productImage,
        year}
      )
        .then((response) => {
          setProductData({
            productName: "",
            productDescription: "",
            productPrice: "",
            subCategory: "",
            year: 0,
          });
        })
      .catch(err => {
        showAlert(err.response.data.error, "danger")
      })      
    }
    console.log(productData)
  }
  //changes for verification
  let loadVerifications = () => {
    allVerifications().then(function (data) {
      console.log(data.data);
      setPendingVerification(data.data);

      setShowVeri(!showVeri);
    });
  };
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

  useEffect(() => {
    loadProducts()
  }, [loading])

  const loadProducts = async () => {
    await getProduct()
    .then((response) => {
      setProduct(response.data)
      console.log('products', response.data)
    }
    )
    .catch((error) => {
      console.log('loadProducts error', error)
    }
    )
  }

  useEffect(() => {
    loadBidProducts()
  }, [loading])

  const loadBidProducts = async () => {
    await getUserBid()
    .then((response) => {
      setBidProducts(response.data.bidProducts)
      console.log('your bided products', response.data.bidProducts)
    }
    )
    .catch((error) => {
      console.log('loadProducts error', error)
    }
    )
  }
  const destroy = async (productId) => {
    setLoading(true)
    await deleteProduct(productId)
    .then((response) => {
      setLoading(false)
      console.log('deleteProduct response', response)
    })
    .catch((error) => {
      setLoading(false)
      console.log('deleteProduct error', error)
    })
  }

  const update = async (productId) => {
    setLoading(true)
    await updateProduct(productId)
    .then((response) => {
      setLoading(false)
      console.log('updateProduct response', response)
    })
    .catch((error) => {
      setLoading(false)
      console.log('updateProduct error', error)
    })
  }


  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    // console.log(category)
  }

  const handleCategorySubmit = (e) => {
    e.preventDefault()
    if (isEmpty(category)) {
      alert('Please enter a category')
    } else {
      const data = { name: category }
      createCategory(data)
        .then(response => {
          setCategory('')
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
      }

  }

  function setBid_Products(){
    setHideShow(!hideshow)
  }

  const showHeader = () => (
    <div className="bg-dark text-light pl-5 pt-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h1>
            <i class="fa-solid pl-5" style={{fontFamily: "'Poppins', sans-serif"}}><MdDashboard className='mr-3 rotate'/>Admin Dashboard</i>
            </h1>
          </div>
        </div>
      </div>
    </div>
  )

  const showActionBtns = () => (
    <div className="bg-dark my-2 pt-3 pb-3">
      <div className="container">
        <div className="row pb3">
          {/* <div className="col-md-4 my-1">
            <button className="btn btn-outline-secondary btn-block" data-toggle='modal' data-target='#addCategoryModal'>
              <i className="fas fa-plus-circle"></i> Create Category
            </button>
          </div> */}
          <div className="col-md-4 my-1">
            <button className="btn btn-outline-warning btn-block" data-toggle='modal' data-target='#addProductModal' >
              <i className="fas fa-plus-circle"></i> Add Product
            </button>
          </div>
          <div className="col-md-4 my-1">
            <button className="btn btn-outline-success btn-block" onClick={setBid_Products}>
            <i class="fa-sharp fa-solid fa-arrow-up-right-from-square"></i>   {hideshow ? "Your Biding" : "Your Uploads"  }
            </button>
          </div>
          
          <div className="col-md-4 my-1">
            <button
              className="btn btn-outline-warning btn-block"
              onClick={loadVerifications}
            >
              {showVeri ? "Products" : "Pending verifications"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

const showProductModal = () => (
  <div
    className="modal fade text-dark"
    id="addProductModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <form onSubmit={handleProductSubmit}>
          <div className="modal-header bg-warning text-white">
            <h5 className="modal-title" id="exampleModalLabel">
              Add New Product
            </h5>
            <button
              type="button"
              className="close text-white"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group mb-3">
              <label htmlFor="recipient-name" className="col-form-label">
                Upload Image
              </label>
              <input
                name="productImage"
                onChange={handleProductImage}
                class="form-control"
                type="file"
                id="formFile"
                accept="image/*"
                multiple
              />
            </div>

            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label">
                Product Name:
              </label>
              <input
                type="text"
                name="productName"
                value={productName}
                onChange={handleProductChange}
                className="form-control"
                id="recipient-name"
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label">
                Product Minimum Bid:
              </label>
               <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                  ₹
                </span>
                <input
                  name="productPrice"
                  value={productPrice}
                  onChange={handleProductChange}
                  type="text"
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div> 
            </div> */}
            <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label" style={{display: "block"}}>
            CONFIRM YOUR LOCATION :
              </label>
            <label className='mt-2'>State</label>
            <select className="custom-select mr-sm-2 " onChange={handleStateChange}>
              <option value="" selected>Choose State</option>
              { LocationData.map((state,index)=>{
                return(
                <option key={index} value={index}>{state.state}</option>
                )
              })
              }
            </select>
            {state && 
            <><label className='mt-3'>City</label><select className="custom-select mr-sm-2 " onChange={(e)=> setCity(e.target.value)}>
                <option value="">Choose City</option>
                { cityArr.length>0 && cityArr.map((city,index)=>{
                    return (
                      <option key={index} value={city}>{city}</option>
                    )
                })
                }
            </select>
            </>
            }
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label">
                Product Description:
              </label>
              <textarea
                name="productDescription"
                value={productDescription}
                onChange={handleProductChange}
                type="text"
                className="form-control"
                id="recipient-name"
                rows="3"
              ></textarea>
            </div>
            <div className="form-row" id="recipient-name">
              <div className="form-group col-md-6">
                <label htmlFor="recipient-name" className="col-form-label">
                  Product Category:
                </label>
                {/* <select
                  name="productCategory"
                  onChange={handleProductChange}
                  className="custom-select mr-sm-2"
                >
                  <option value="" selected>
                    Choose Category
                  </option>
                  {categories &&
                    categories.map((c, i) => (
                      <option key={i} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select> */}
                <select name="productCategory" className="custom-select mr-sm-2" onChange={handleMajorCategoryChange}>
                <option  value="" selected>Choose Category</option>
                {CategoryData && CategoryData.map((category,index)=>{
                  return( <option value={index}>{category.title}</option>)
                })}
                </select>
                {disSubCategory.length>0 &&  <select name="subCategory" className="custom-select mr-sm-2 mt-3" onChange={handleProductChange}>
                <option value="" selected>Choose Sub Category</option>
                {disSubCategory.map((subCategory,index)=>{
                  return( <option key={index} value={subCategory.title}>{subCategory.title}</option>)
                })} 
                </select>
                }
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="recipient-name" className="col-form-label">
                  Product Year:
                </label>
                <select
                  class="form-control"
                  id="usedAndNew"
                  onChange={usedChange}
                > 
                  <option value="new" >New</option>
                  <option value="old">Old</option>
                </select>
                {used == "old" && (
                  <input
                    name="year"
                    value={year}
                    onChange={handleProductChange}
                    type="number"
                    min="1"
                    className="form-control mt-3"
                    id="recipient-name"
                    placeholder="How many years old?"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

const callAcceptBid= (e)=>{
  const obj = Object.assign({}, e.target.value.split(","))
  acceptBid(obj)
  .then(response => {
    showAlert(response.data.message, "success")
  })
  .catch(error => {
    console.log(error)
  })

}
const callRejectBid= (e)=>{
  
  console.log("rejectBid",e.target)
}

const withDrawMyBid = async(productId) =>{
  await withDraw({productId:productId})
  .then((response) => {
    showAlert(response.data.message, "success")
  }
  )
  .catch((error) => {
    console.log('loadProducts error', error)
  }
  )
}

const showProducts = () => (
    <div className="row text-white bg-dark">
      <div className="col-md-12">
        <h2 className="text-center">Total {products.length} products</h2>
        <hr />
        { products && products.map((p, i) => (
          <div className="card mb-3 bg-dark border" key={i}>
            <div className="row no-gutters">
              <div className="col-md-4">
              <img src= {p.images[0].url} className="card-img" alt={p.productName} />
              </div>
              <div className="col-md-4">
                <div className="card-body">
                  <h5 className="card-title">{p.productName}</h5>
                  <p className="card-text">{p.productDescription}</p>
                  <p className="card-text"><small className="text-muted">Category: {p.subCategory}</small></p>
                  <p className="card-text"><small className="text-muted">year: {p.year}</small></p>
                  {/* <p className="card-text"><small className="text-muted">Minimum Bid: ₹{p.productPrice}</small></p> */}
                  <p className="card-text"><small className="text-muted">Added on: {moment(p.createdAt).fromNow()}</small></p>
                  <p className="card-text"><small className="text-muted">Last updated: {moment(p.updatedAt).fromNow()}</small></p>
                  <Link to={`/admin/product/update/${p._id}`} className="btn btn-outline-warning btn-sm mr-2 scale">Update</Link>
                  <button onClick={() => destroy(p._id)} className="btn btn-outline-danger btn-sm scale">Delete</button>
                </div>
              </div>
              <div className='col-md-4 mt-4'>
                { p.bidder.length>0 ? p.bidder.reverse().map((b, i) => (
                  i<10 &&
                    <div className='d-flex justify-content-between'>
                      <div style={{width: "65px"}}>
                      <span className="mr-3 align-top h2">{i+1}</span>
                      <CgProfile className="text-black h1 float-right" />
                      </div>
                      <p className="ml-3 flex-grow-1 align-self-center h5">Bid Amount: ₹<strong>{b.bidAmount}</strong></p>
                      <div>
                        <button type="button" className="btn btn-outline-success mr-3 scale" onClick={callAcceptBid} value={[b.bidderId,p._id]}>Accept</button>
                        <button type="button" className="btn btn-outline-danger mr-3 scale" onClick={callRejectBid} value={b.bidderId}>Reject</button>
                      </div>
                    </div>
                ))
                : <p className='text-black ml-3'>No bidder yet...hope you will soon find a good bidder</p>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  const showBidProducts = ()=>(
    <div className="container-fluid pl-5 pt-3 text-center text-white">
      <div className='row text-center'>
      {bidProducts && bidProducts.map((bidProduct) =>(
        <div className="card text-left mr-5 " style={{width: "28rem"}}>
          <img src= {bidProduct.images[0].url} className="card-img-top w-100" alt={bidProduct.productName} height="270px"/>
          <div className="card-body pb-2">
            <h5 className="card-title h1 text-dark">{bidProduct.productName}</h5>
            <p className="card-text text-muted"> Your Bid Amount: <span className='font-weight-bold pl-3'>₹ {bidProduct.bidAmount}</span></p>
            <p className='pt-3'><Link to={`/singleproduct/${bidProduct.productId}`} className="btn btn-lg scale btn-outline-primary float-left">Change Bid</Link>
            <button type="button" class="btn btn-lg scale btn-outline-danger float-right" onClick={()=>withDrawMyBid(bidProduct.productId)}>Withdraw</button></p>
          </div>
        </div>
        ))}
      </div>
    </div>
  )

  const showPendingVerifications = () => (
    <div className="row text-white">
      <div className="col-md-12">
        <h2 className="text-center fs-6" style={{ fontFamily: "Gilroy" }}>
          {pendingVerification.length} Pending verification
        </h2>
        <hr />
        <div className="container text-white">
          {pendingVerification.length === 0 ? (
            "Nothing Pending here !!"
          ) : (
            <table className="table text-white">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Username</th>
                  <th scope="col">Aadhar Card</th>
                  <th scope="col">Profile Image</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingVerification &&
                  pendingVerification.map((p, i) => (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{p.user_id.name}</td>
                      <td>
                        <a href={p.aadhar.url} target="_blank">
                          View Image
                        </a>
                      </td>
                      <td>
                        <a href={p.profileImage.url} target="_blank">
                          View Image
                        </a>
                      </td>
                      <td>
                        <button
                          className="btn btn-success mr-5"
                          onClick={() => {
                            acceptVerification(p.user_id._id).then(function (
                              data
                            ) {
                              setPendingVerification(data.data);
                              showPendingVerifications();
                            });
                          }}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteVerification(p._id).then(function (data) {
                              setPendingVerification(data.data);
                              showPendingVerifications();
                            });
                          }}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <section>
     <Alert alert={alert}/>
      {showHeader()}
      {showActionBtns()}
      {/* {showCategoryModal()} */}
      {showProductModal()}
      {showVeri ? showPendingVerifications() : hideshow && showProducts()}
      {!showVeri && !hideshow && showBidProducts()}
    </section>
  )
}

export default AdminDashboard