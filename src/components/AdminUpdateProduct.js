import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { getProduct } from '../api/product'
import { createCategory, getCategories } from '../api/category'

const AdminUpdateProduct = ({ match }) => {
  const productId = useParams()
  console.log(productId)

  const [productImage, setProductImage] = useState(null)
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productQuantity, setProductQuantity] = useState('')
  
  useEffect(() => {
    loadProduct()
  }, [])

  const loadProduct = async () => {
    await getProduct(productId)
    .then((response) => {
      setProductImage(response.data.productImage)
      setProductName(response.data.productName)
      setProductDescription(response.data.productDescription)
      setProductPrice(response.data.productPrice)
      setProductCategory(response.data.productCategory)
      setProductQuantity(response.data.productQuantity)
    }
    )
    .catch((error) => {
      console.log('loadProduct error', error)
    }
    )
  }

  const setProductData = (e) => {
    setProductImage(e.target.files[0])
    setProductName(e.target.value)
    setProductDescription(e.target.value)
    setProductPrice(e.target.value)
    setProductCategory(e.target.value)
    setProductQuantity(e.target.value)
  }

  const productData = {
    productImage,
    productName,
    productDescription,
    productPrice,
    productCategory,
    productQuantity
  }
  const [category , setCategory] = useState('')
  const [categories, setCategories] = useState('')
  const [products, setProduct] = useState('')
  const [loading, setLoading] = useState(false);


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

  const handleProductImage = (e) => {
    console.log(e.target.files[0])
    setProductImage(e.target.files[0])
  }

  const handleProductChange = (e) => {
    setProductData({...productData, [e.target.name]: e.target.value})
  }

  const handleProductSubmit = (e) => {
    e.preventDefault()
    console.log('productImage', productImage)
    console.log('productName', productName)
    console.log('productDescription', productDescription)
    console.log('productPrice', productPrice)
    console.log('productCategory', productCategory)
    console.log('productQuantity', productQuantity)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Update Product</h1>
          <hr />
          <form onSubmit={handleProductSubmit}>
            <div className="form-group">
              <label className="text-muted">Product Image</label>
              <input type="file" name="productImage" onChange={handleProductImage} className="form-control" accept="image/*" />
            </div>
            <div className="form-group">
              <label className="text-muted">Product Name</label>
              <input type="text" name="productName" onChange={handleProductChange} className="form-control" value={productName} />
            </div>
            <div className="form-group">
              <label className="text-muted">Product Description</label>
              <textarea type="text" name="productDescription" onChange={handleProductChange} className="form-control" value={productDescription} />
            </div>
            <div className="form-group">
              <label className="text-muted">Product Price</label>
              <input type="number" name="productPrice" onChange={handleProductChange} className="form-control" value={productPrice} />
            </div>
            <div className="form-group">
              <label className="text-muted">Product Category</label>
              <select name="productCategory" onChange={handleProductChange} className="form-control" value={productCategory}>
                <option>Please select</option>
                {categories && categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="text-muted">Product Quantity</label>
              <input type="number" name="productQuantity" onChange={handleProductChange} className="form-control" value={productQuantity} />
            </div>
            <button type='submit' className="btn btn-primary">Update Product</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminUpdateProduct