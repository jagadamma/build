import React,{ useEffect, useState ,createContext, useReducer  } from "react";
import { BrowserRouter, Routes , Route} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import NotFound from "./NotFound";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import AdminUpdateProduct from "./AdminUpdateProduct";
import Profile from "./Profile";
import SingleProduct from "./SingleProduct";
import Product from "./Product";
import CategoryProduct from "./CategoryProduct"
import Notification from "./Notification"
import Reset from "./Reset";
import ForgotPassword from "./ForgotPassword";
import Chat from "./Chat";
//socket.io configuration
import { io } from "socket.io-client";
import {initialState, reducer} from "../helpers/productReducer"

export const ProductContext = createContext();

const App = () => {

  const [Socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = io("http://localhost:5000");
    setSocket(socket);
  }, []);
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ProductContext.Provider value={{ state, dispatch}}>
  <BrowserRouter>
    <Header /> 
    <main>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/signup" element = {<Signup/>} />
        <Route path="/signin" element = {<Signin/>} />
        <Route path="/user/dashboard" element = {<UserDashboard/>} />
        <Route path="/admin/dashboard" element = {<AdminDashboard/>} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/products" element={<Product />}/>
        <Route path="/singleproduct/:productId" element={<SingleProduct/>}/>
        <Route path="/category/:categoryName" element={<CategoryProduct/>}/>
        <Route path="/admin/product/update/:productId" element={<AdminUpdateProduct/>}/>
        <Route path="/notification" element={<Notification/>}/>
        <Route path="*" element = {<NotFound/>} />
        <Route path="/reset" element={<Reset/>}/>
        <Route path="/reset/:token" element={<ForgotPassword/>}/>
        <Route path="/chat/:id" element={<Chat socket={Socket} />} />

      </Routes>
    </main>

  </BrowserRouter> 
  </ProductContext.Provider>

  );
  }

export default App;
