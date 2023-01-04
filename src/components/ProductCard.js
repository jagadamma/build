import React, {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import moment from 'moment';
import isEmpty from 'validator/lib/isEmpty';
import { createCategory, getCategories } from '../api/category'
import { createProduct, getProduct, deleteProduct, updateProduct } from '../api/product'
import { showErrorMessage, showSuccessMessage } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const ProductCard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [category , setCategory] = useState('')
  const [categories, setCategories] = useState('')
  const [products, setProduct] = useState('')

  const [productData, setProductData] = useState({
    productImage: null,
    productName: '',
    productDescription: '',
    productPrice: '',
    mainCategory: '',
    subCategory: '',
    productQuantity: '',
  })



  const {productImage, productName, productDescription, productPrice, mainCategory,subCategory, year} = productData;

  const handleProductImage = (e) => {
    console.log(e.target.files[0])
    setProductData({...productData, productImage: e.target.files[0]})
  }

  const handleProductChange = (e) => {
    setProductData({...productData, [e.target.name]: e.target.value})
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

  const showProducts = () => (
    
    //product card
    <div className="row ">
        { products && products.map((p, i) => (
          <div style={{position:'relative'}} className='productCard border border-white border-top-0'>
          <img src= {p.images[0].url} className="card-img" alt={p.productName} />
            <div style={{padding: "0 10px"}}>
              <h3 className='mt-3'>{p.productName}</h3>
              {/* <p>Current Bid: <span className='currentBid'>Rs {p.productPrice}</span></p> */}
              {/* <p className='descP'>{p.productDescription}</p> */}
              <p className='mt-3'>{p.subCategory}</p>
            </div>
            <div style={{margin: "10px", position:'absolute', bottom:'5px'}}>
                <button className="scale" onClick={()=>navigate(`/singleproduct/${p._id}`)}>Bid higher</button> 
                <OverlayTrigger 
        delay={{ hide: 450, show: 300 }}
        overlay={(props) => (
          <Tooltip {...props} > 
            {p.productDescription}
          </Tooltip>
        )}
        placement="bottom"
      ><img src="images/i_icon.svg" className="info scale" style={{position:'absolute', right:'-142px'}}/>
      </OverlayTrigger>
                
            </div>
          </div>
        ))}
    </div>
  )

  return (
    <div>
      {showProducts()}
    </div>    
  )
}

export default ProductCard