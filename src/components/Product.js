import React, {useEffect, useState} from 'react'
import {useNavigate, NavLink, useLocation} from "react-router-dom"
import ProductCard from './ProductCard'
import {CategoryData} from "../helpers/categoryData"
import { CgDetailsLess } from "react-icons/cg";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { searchAndRefine } from "../api/product";
import { GiQueenCrown } from 'react-icons/gi';

const Product = () => {

  const query = new URLSearchParams(useLocation().search);
  const search = query.get("search") || "";
  const category = query.get("category") ? query.get("category") : "";
  const subCategorytemp = query.get("subCategory") ? query.get("subCategory") : "";
  const location = query.get("location") ||"";
  const page = Number(query.get("page")) || 1;
  const [mainCategory, setMainCategory] = useState(category)
  const [disSubCategory, setSubArrCategory] = useState([])
  const [subCategory, setSubCategory] = useState(subCategorytemp)
  const [products, setProduct] = useState('')
  const [showFilter, setShowFilter] = useState(window.innerWidth)
  const [year, setYear] = useState("")
  const navigate = useNavigate();
  const [sort, setSort] = useState("asc")
  const [count, setCount] = useState(1);

useEffect(() => {
  searchProdct()
}, [location, search,mainCategory, subCategory,year,sort,page])
const searchProdct=()=>{
    searchAndRefine(location, search,page,mainCategory,subCategory,year,sort)
    .then((response) => {
      setProduct(response.data.product)
      setCount(Math.ceil(response.data.productCount/4))
    }
    )
    .catch((error) => {
      console.log('loadproduct error', error)
    }
    )
  }
  useEffect(()=>{if(window.innerWidth<576){
    setShowFilter(!showFilter)
  }},[])
  const handleMajorCategoryChange=(index) =>{
    if (index.target.value === ""){
      setMainCategory("")
      setSubArrCategory([])
      setSubCategory("")
    }
    else{
      setMainCategory(CategoryData[index.target.value].title)
      setSubArrCategory(CategoryData[index.target.value].subNav)
      setSubCategory("")
    }
  }
  console.log("count", count)
  const handleSubCategoryChange=(e)=>{
    setSubCategory(e.target.value)
  }
  
  return (
    <div>
        {/* <div className='homeHeading'>
            <NavLink><p className="homeHeading-p">How  It Works</p></NavLink>
            <NavLink><p className="homeHeading-p">Auction</p></NavLink>
            <NavLink><p className="homeHeading-p">Sell your product</p></NavLink>
            <NavLink><p className="homeHeading-p pt-3" style={{marginBottom: "0"}}>Services and Support</p></NavLink>
        </div> */}
        {window.innerWidth<576 && <div><p className='mr-5 h2 mt-4 ml-5' onClick={()=>setShowFilter(!showFilter)}><CgDetailsLess className='mr-4'/>Filter | Refine</p></div>}
        <div className='contatiner'>
        <div className='row'>
        {showFilter &&
          <div className='col-12 col-sm-3 border mt-4 rounded pb-3'>
              <p className='border-bottom h1 p-3'>Filter</p>
              <p className='pl-3'>Category</p>
              <select name="productCategory" className="custom-select mr-sm-2 ml-2" onChange={handleMajorCategoryChange}>
                <option  value="" >All Products</option>
                {CategoryData && CategoryData.map((category,index)=>{
                  return( <option value={index}>{category.title}</option>)
                })}
                </select>
                {disSubCategory.length>0 &&  <select name="subCategory" className="custom-select mr-sm-2 mt-3 ml-2" onChange={handleSubCategoryChange}>
                <option value="" selected>All Sub Category</option>
                {disSubCategory.map((subCategory,index)=>{
                  return( <option key={index} value={subCategory.title}>{subCategory.title}</option>)
                })} 
                </select>
                }
                <p className='pl-3 pt-3'>New | Old</p>
                <select
                  className="custom-select mr-sm-2 ml-2"
                  onChange={(e)=>setYear(e.target.value)}
                > <option value="" selected>Both</option>
                  <option value="0">New</option>
                  <option value="99">Old</option>
                </select>
                <p className='border-top border-bottom h1 p-3 mt-5'>Refine By</p>
                {/* {disSubCategory.length>0 && subCategory=="" &&         
                <><p className='pl-3 mt-2'>Sub Category</p>
                <select name="subCategory" className="custom-select mr-sm-2 mt-1 ml-2" >
                <option value="" selected>Random</option>
                {disSubCategory.map((subCategory,index)=>{
                  return( <option key={index} value={subCategory.title}>{subCategory.title}</option>)
                })} 
                </select>
                </>
                }                 
                */}
                <p className='pl-3 mt-4'>Year</p>
                  <select className='custom-select mr-sm-2 ml-2' onChange={(e)=>{setSort(e.target.value)}}>
                    <option value="asc">New top</option>
                    <option value="desc">Old top</option>
                  </select>
                  
          </div>
        }
          <div className="col-sm-9 pl-5" >
          <div className="row ">
        { products.length>0 ? <>{products.map((p, i) => (
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
        <div className='col-12 mt-3'>
<nav >

  <ul className='pagination justify-content-center'>
  <li className={page==1 ?'page-item h4 disabled':'page-item h4'}><NavLink to={`/products?location=${location}&search=${search}&category=${mainCategory}&subCategory=${subCategory}&page=${page-1}`} className="page-link">&laquo;</NavLink></li>
    { Array.from(Array(count), (e, i) => {
      return <li key={i+1} className={page==i+1?"page-item h4 active": "page-item h4"} ><NavLink className="page-link" to={`/products?location=${location}&search=${search}&category=${mainCategory}&subCategory=${subCategory}&page=${i+1}`}>{i+1}</NavLink></li>
    })}
    <li className={page==count ?'page-item h4 disabled':'page-item h4'}><NavLink className="page-link" to={`/products?location=${location}&search=${search}&category=${mainCategory}&subCategory=${subCategory}&page=${page+1}`}>&raquo;</NavLink></li>
  </ul>
</nav>
</div></>: <div className='col-12 text-center font-weight-bold mt-5'>
      <p>Oops... we didn't find anything that matches this search :</p>
      <p>Try search for something more general, change the filters or check for spelling mistakes</p>
      <img className="mt-5"src="/images/browser.png" height="150px" width="150px"/>
     </div>}
    </div>          
    </div>
          </div>
        </div>
        
    </div>
  )
}

export default Product
