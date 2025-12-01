import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <a className="fbn-logo simple" href="/">
            <span className="mark">FBN</span>
            <span className="name">FoodStore</span>
          </a>
          <p>
            We care about what you eat. That’s why we deliver fresh, tasty meals
            quickly and reliably — making sure every bite feels worth it.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@fbnfoodstore.com</li>
          </ul>
        </div>
      </div>
      <p className="footer-copy-right">
        Copyright 2025 @ fbnfoodstore.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
