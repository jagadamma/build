import React from 'react'
import { NavLink } from 'react-router-dom';
import HeaderCard from './HeaderCard'
import {FaGreaterThan} from "react-icons/fa"
import ProductCard from './ProductCard';
import Footer from './Footer';
import Navbar from './Sidebar';
const Home = () => {

  return (
    <div>
        <div class="ticker-title" >
        <span>BidOnBuy.com its a platform to connect buyers and sellers</span>
        <span>BidOnBuy.com its a platform to connect buyers and sellers</span>
        <span>BidOnBuy.com its an platform to connect buyers and sellers</span>
        </div>
        {/* <div className='homeHeading'>
            <NavLink><p className="homeHeading-p">How  It Works</p></NavLink>
            <NavLink><p className="homeHeading-p">Auction</p></NavLink> 
            <NavLink><p className="homeHeading-p">Sell your product</p></NavLink>
            <NavLink><p className="homeHeading-p pt-3" style={{marginBottom: "0"}}>Services and Support</p></NavLink>
        </div> */}
 <Navbar/>
        <div className='headerSection'>
            {/* <p className="headerSection-p">100% Safe And Free Auctions</p> */}
            <div className="allHeaderCard row">
                <HeaderCard serial="1" heading="Register" info="Sign up on our site to start bidding." />
                <HeaderCard serial="2" heading="Find" info="Find from more than 30,000 products."/>
                <HeaderCard serial="3" heading="Bid" info="Start bidding, bid highest, contact seller"/>
            </div> 
        <NavLink to="/signup">
            <button className='searchBtn'>Register to Start Bidding<span style={{marginRight: "20px"}}></span><FaGreaterThan /></button>
        </NavLink>
        </div>
        <section style={{padding: "20px"}}>
            <div>
            <h1 className="popularBidding-h1">Popular Biddings</h1>
            <NavLink className ="bsplay" to="/products"><i class="fa-solid fa-play fa-2xl"></i></NavLink>
            </div>
            <div>
                <ProductCard />
            </div>
        </section>
        <div className='sellWithUs'>
            {/* <img src="/images/layered.svg" alt="layered imgage"style={{width: "100%"}}/> */}
            <h3 className='pt-5'>Advertise with us</h3>
            <p className="mb-4">Promote your bussiness on Bidonbuy. Reach millions of customer on bid on buy.</p>
            <p>Customers come to us site for seeling and buying goods across from wide range which including cars, homes, mobiles, furniture. Advertising with us is aunique opportunity to reach a huge global audience in a creative and compelling way. We present your brand's message in a bigger, bolder, and more beautiful way</p>
            <ul>
                <li><span>✓</span>No Hidden Charge</li>
                <li><span>✓</span>24 X 7 support</li>
                <li><span>✓</span>Access to over 175,000 products</li>
            </ul>
            <NavLink to="/signup">
            <button className='getStartedBtn sellHover'>Get Started</button>
            </NavLink>
        </div>
        <section style={{padding: "20px"}}>
            <h1 style={{fontWeight: "700",fontSize: "32px", color: "#0457D4", paddingLeft: "2.3rem" , display: "inline"}}>BidOnBuy Selects</h1>            
            <div>
                <ProductCard />
            </div>
        </section>
        <section style={{padding: "20px"}}>
            <h1 style={{fontWeight: "700",fontSize: "32px", color: "#0457D4", paddingLeft: "2.3rem" , display: "inline"}}>New Arrivals</h1>            
            <div>
                <ProductCard/>
            </div>
        </section>
        <div className='account text-center  border-top'>
        <h3  style={{paddingBottom: "20px", paddingTop: "8px"}}>Follow Us</h3>
        <div style={{paddingBottom: "20px"}}>
            <NavLink className="px-3"><img src="/images/instagram_icon.svg"/></NavLink>
            <NavLink className="px-3"><img src="/images/facebook_icon.svg"/></NavLink>
            <NavLink className="px-3"><img src="/images/linkedIn_icon.svg"/></NavLink>
        </div>
    </div>
        <Footer />
    </div>
  )
}

export default Home