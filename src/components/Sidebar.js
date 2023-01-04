// import React, {useState, useEffect} from "react";

// // ICONS
// import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
// import * as AiIcons from "react-icons/ai";
// import {BiCategoryAlt} from "react-icons/bi"
// import { IconContext } from "react-icons";

// import { CgDetailsLess } from "react-icons/cg";

// // ROUTING

// import {NavLink, Link } from "react-router-dom";

// // DATA FILE
// import { getCategories } from '../api/category'

// import { CategoryData } from "../helpers/categoryData";

// // STYLES
// import "./css/navbar.css";

// export default function Navbar() {
//   const [sidebar, setSidebar] = useState(true);
//   const [showCategory, setShowCategory] =useState(false)
//   const showSidebar = () => setSidebar(!sidebar);
//   const [categories, setCategories] = useState('')
//   const [loading, setLoading] = useState(false);
//   console.log(categories)
//   useEffect(() => {
//       loadCategories()
//     }, [loading])
//   const loadCategories = async () => {
//       await getCategories()
//       .then((response) => {
//         setCategories(response.data)
//         console.log('categories', response.data)
//       }
//       )
//       .catch((error) => {
//         console.log('loadCategories error', error)
//       }
//       )
//     }
  
//   const showInsideCategory=(data)=>{
//     console.log(data)
//     return <div  style={{position: "relative", top: "130px", left:"100px"}}>
//       {data.map(category=>{
//        <p> {category}</p>
//       })
//       }
//     </div>
    
//   }
//   return (
//     <>
//       <IconContext.Provider value={{ color: "#FFF" }}>
//         {/* All the icons now are white */}
//         <div className="navbar">
//           <Link to="#" className="menu-bars text-decoration-none" onClick={showSidebar}>
//             <CgDetailsLess/><span  className="text-white">All Categories</span>
//           </Link>
//         </div>
//         <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
//           <ul className="nav-menu-items" onClick={showSidebar}>
//             <li className="navbar-toggle pt-5 mb-5 ">
//               <Link to="#" className="menu-bars pt-5 glow">
//                 <AiIcons.AiOutlineClose className="scale"/>
//               </Link>
//             </li>

//             {/* {categories.length>0 && categories.map((item, index) => {
//               return (
//                 <li key={index} className="nav-text">
//                   <a href={`/category/${item.name}`}>
//                   <BiCategoryAlt/>
//                     <span>{item.name}</span>
//                   </a>
//                 </li>
//               );
//             })} */}
//             {CategoryData.map((item, index) => {
//               return (
//                <div><li key={index} className="nav-text">
//                   <Link to={item.path}>
//                     {item.icon}
//                     <span >{item.title}</span>
//                   </Link>
//                   <AiIcons.AiOutlineDown className="float-right h4 mr-3"/>
//                   {item.option.map(category=>{
//                  <li className="nav-text" >
//                   <span>{category}</span>   
//                 </li>
//                 }
//               )}
//                 </li>
            
//                </div> 
//               );
//             })}
//           </ul>
//         </nav>
//       </IconContext.Provider>
//     </>
//   );
// }

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, Navigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { CategoryData } from "../helpers/categoryData";
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import { CgDetailsLess } from "react-icons/cg";

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
  overflow: auto;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [mainCategory, setMainCategory] = useState("")
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
          <span  className="text-white ml-4" onClick={showSidebar} ><CgDetailsLess className='mr-4'/>All Categories</span>
          <Link className='text-white scale pl-5' to='/products?category=Cars'>Cars</Link>
          <Link className='text-white scale pl-5' to="/products?category=Mobiles">Mobiles</Link>
          <Link className='text-white scale pl-4' to="/products?category=Bikes">Bikes</Link>
          <Link className='text-white scale pl-5' to="/products?category=Electronics And Appliances">Electronics & Appli...</Link>
          <Link className='text-white scale pl-5' to="/products?category=Furniture">Furniture</Link>
          <Link className='text-white scale pl-5' to="/products?category=Books, Sports And Hobbies">Books, Sport, & Hob...</Link>
          <Link className='text-white scale pl-5' to="/products?category=Fashion">Fashion</Link>
          <Link className='text-white scale pl-5' to="/products?category=Pets">Pets</Link>
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#' className='mt-5'>
              <AiIcons.AiOutlineClose onClick={showSidebar} className="mt-3 ml-2"/>
            </NavIcon>
            {CategoryData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
