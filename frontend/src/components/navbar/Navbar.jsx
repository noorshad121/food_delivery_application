import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";

const Navbar = ({ setShowLogin }) => {
  const { cartItems, token,setToken } = useContext(StoreContext);
  const [menu, setMenu] = useState("");

  // Function to scroll smoothly to sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
      element.scrollIntoView({behavior: "smooth" });
      setMenu(id)
  };
  const navigate = useNavigate();

  const logout = ()=> {
    localStorage.removeItem("token");
    setToken("")

    navigate("/")
  
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/"><h2>FBN-FoodStore</h2></Link>
      </div>

      <ul className="nav-item">
        <Link to="/" onClick={() => scrollToSection("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <Link to="/" onClick={(e) => {  scrollToSection("menu") }} className={menu === "menu" ? "active" : ""}>Menu</Link>
        <Link to="/" onClick={(e) => {  scrollToSection("mobile") }} className={menu === "mobile" ? "active" : ""}>Mobile App</Link>
        <Link to="/" onClick={(e) => {  scrollToSection("contact") }} className={menu === "contact" ? "active" : ""}>Contact Us</Link>
      </ul>

      <div className="nav-image">
        <img src={assets.search_icon} alt="search" />
        <div className="basket-wrapper">
          <Link to="/cart"><img src={assets.basket_icon} alt="cart" /></Link>
          <span className="cart-dot"></span>
        </div>
       {!token ?  <button onClick={() => setShowLogin(true)}>Sign In</button>
       : <div className="drop-down">
        <img src={assets.profile_icon} alt="" />
        <ul>
          <li><img src={assets.bag_icon} alt="" />Orders</li>
          <li onClick={logout}><img src={assets.logout_icon} alt="" />Logout</li>
        </ul>
      
       </div>
       }
      </div>
    </div>
  );
};

export default Navbar;



/*
import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import {Link} from "react-router-dom"
import { StoreContext } from "../../context/StoreContext.jsx";
const Navbar = ({setShowLogin}) => {

  const {cartItems} = useContext(StoreContext)

  const [menu,setMenu] = useState("");

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/"><h2>FBN-FoodStore</h2></Link>
      </div>
      <ul className="nav-item">
        <Link to="/" onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href="#menu" onClick={()=>setMenu("menu")}  className={menu==="menu"?"active":""}>menu</a>
        <a href="#mobile" onClick={()=>setMenu("mobile")} className={menu==="mobile"?"active":""}>mobile-app</a>
        <a href="#contact" onClick={()=>setMenu("contact")} className={menu==="contact"?"active":""}>contact-us</a>
      </ul>
      <div className="nav-image">
        <img src={assets.search_icon} alt="" />
       <div className="basket-wrapper">
       <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link> 
    <span className="cart-dot"></span>
  </div>
      <button onClick={()=>setShowLogin(true)}>sign in</button>
           </div>
    </div>
  );
};
export default Navbar;  */
