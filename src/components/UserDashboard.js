import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment';
import isEmpty from 'validator/lib/isEmpty';
import { getCategories } from '../api/category'
import { createProduct, getUserProduct, deleteProduct, updateProduct } from '../api/product'
import { showErrorMessage, showSuccessMessage } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import {MdDashboard} from "react-icons/md"
import {getUserBid, acceptBid, withDraw, reject } from '../api/bid'
import {getLocalStorage} from "../helpers/localStorage"
import Alert from './Alert';
import {CgProfile} from "react-icons/cg"

const UserDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [hideshow, setHideShow] = useState(true)
  const [category , setCategory] = useState('')
  const [categories, setCategories] = useState('')
  const [products, setProduct] = useState('')
  const [bidProducts, setBidProducts] = useState('')
  const [images, setImages] = useState([]);
  const [used, setUsed] = useState('new');
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



  function usedChange(e){
   setUsed(document.getElementById("usedAndNew").value)
  }

  const [productData, setProductData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productCategory: '',
    year: 'New'
  })



  const {productName, productDescription, productPrice, productCategory, year} = productData;

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

  const handleProductChange = (e) => {
    setProductData({...productData, [e.target.name]: e.target.value})
    console.log(productData)
  }

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (images.length==0 || isEmpty(productName) || isEmpty(productDescription) || isEmpty(productPrice) || isEmpty(productCategory) || isEmpty(year)) {
      showAlert('Please fill all fields', "danger")
    } else {
      let formData = new FormData();
      let productImage = [];
      console.log(images);
      images.forEach((i) => {
        productImage.push(i);
      });

      // formData.append("productName", productName);
      // formData.append("productDescription", productDescription);
      // formData.append("productPrice", productPrice);
      // formData.append("productCategory", productCategory);
      // formData.append("year", year);
      console.log(formData);
      createProduct({
        productName,
        productDescription,
        productPrice,
        productCategory,
        productImage,
        year}
      )
        .then((response) => {
          setProductData({
            productName: "",
            productDescription: "",
            productPrice: "",
            productCategory: "",
            year: "",
          });
        })
      .catch(err => {
        showAlert(err.response.data.error, "danger")
      })      
    }
    console.log(productData)
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

  useEffect(() => {
    loadProducts()
  }, [loading])

  const loadProducts = async () => {
    await getUserProduct()
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

  function setBid_Products(){
    setHideShow(!hideshow)
  }

  const showHeader = () => (
    <div className="bg-dark text-light pl-5 pt-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h1>
            <i class="fa-solid pl-5" style={{fontFamily: "'Poppins', sans-serif"}}><MdDashboard className='mr-3 rotate'/>Dashboard</i>
            </h1>
          </div>
        </div>
      </div>
    </div>
  )

  const showActionBtns = () => (
    <div className="bg-dark my-2 pt-3 pb-3">
      <div className="container ">
        <div className="row pb-3">
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
            <div className="form-group">
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
                <select
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
                </select>
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
                  <option value="new">New</option>
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
const callRejectBid= (userId,productId)=>{
  reject({productId: productId, userId: userId})
  .then((response) => {
    showAlert(response.data.message, "success")
  }
  )
  .catch((error) => {
    console.log('reject bid error', error)
  }
  )

}
const withDrawMyBid = async(productId) =>{
  await withDraw({productId:productId})
  .then((response) => {
    showAlert(response.data.message, "success")
  }
  )
  .catch((error) => {
    console.log('withdraw reject error', error)
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
                  <p className="card-text"><small className="text-muted">Category: {p.productCategory.name}</small></p>
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
                        <button type="button" className="btn btn-outline-danger mr-3 scale" onClick={()=>callRejectBid(b.bidderId,p._id)} >Reject</button>
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

  
  return (
    <section>
     <Alert alert={alert}/>
      {showHeader()}
      {showActionBtns()}
      {showProductModal()}
      {hideshow && showProducts()}
      {!hideshow && showBidProducts()}
    </section>
  )
}

export default UserDashboard