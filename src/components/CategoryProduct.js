import React, {useState, useEffect} from 'react'
import {useNavigate, NavLink, useParams } from "react-router-dom"
import { getProductByCategory } from '../api/category'
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Navbar from './Sidebar';

const CategoryProduct = () => {

    const navigate = useNavigate();
    const categoryName = useParams()
    const [loading, setLoading] = useState(false);
    const [products, setProduct] = useState('')

    useEffect(() => {
        loadProducts()
    }, [loading])
    const loadProducts = async () => {
        await getProductByCategory(categoryName.categoryName)
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
  return (
    <div>
        <div className='homeHeading'>
            <NavLink><p className="homeHeading-p">How  It Works</p></NavLink>
            <NavLink><p className="homeHeading-p">Auction</p></NavLink>
            <NavLink><p className="homeHeading-p">Sell your product</p></NavLink>
            <NavLink><p className="homeHeading-p pt-3" style={{marginBottom: "0"}}>Services and Support</p></NavLink>
        </div>
        <Navbar/>
        <div className="row pl-5" >
        { products.length>0 ? products.map((p, i) => (
          <div style={{position:'relative'}} className='productCard'>
          <img src= {p.images[0].url} className="card-img" alt={p.productName} />
            <div style={{padding: "0 10px"}}>
              <h3>{p.productName}</h3>
              {/* <p>Current Bid: <span className='currentBid'>Rs {p.productPrice}</span></p> */}
              {/* <p className='descP'>{p.productDescription}</p> */}
              <p>{p.productCategory.name}</p>
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
      ><img src="/images/i_icon.svg" className="info scale" style={{position:'absolute', right:'-142px'}}/>
      </OverlayTrigger>
                
     </div>
          </div>
     )): 
     <div className='col-12 text-center font-weight-bold'>
      <p>Oops... we didn't find anything that matches this search :</p>
      <p>Try search for something more general, change the filters or check for spelling mistakes</p>
      <img className="mt-5"src="/images/browser.png" height="150px" width="150px"/>
     </div>} 
        
    </div>
    </div>
  )
}

export default CategoryProduct