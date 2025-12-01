import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext.jsx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { food_list, removeToCart, cartItems, getTotalCartAmmout,url } = useContext(StoreContext);

  const navigate = useNavigate();
  return (
    <div className="cart left-cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index} className="cart-item-title cart-items-item">
                <img src={url+"/image/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>₹{(item.price).toLocaleString("en-IN")}</p>
                <p>{cartItems[item._id]}</p>
                <p>₹{(item.price * cartItems[item._id]).toLocaleString("en-IN")}</p>
                <p
                  onClick={() => removeToCart(item._id)}
                  className="remove-btn"
                >
                  X
                </p>
              </div>
            );
          }
        })}
      </div>
      <hr />
      <div className="cart-bottom right-cart">
        <div className="cart-total">
          <h2>Cart Totals</h2>
        </div>
        <div className="cart-total-detalis">
          <p>Subtotal</p>
          <p>₹{getTotalCartAmmout().toLocaleString("en-IN")}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>₹2</p>
        </div>
        <hr />
        <div className="cart-total details">
          <b>Total</b>
          <b>₹{(getTotalCartAmmout() + 2).toLocaleString("en-IN")}</b>
        </div>
        <button onClick={()=> navigate("/order")}>Proceed to checkout</button>
      </div>
      <div className="cart-promocode">
        <p>If you have a promo code, Enter it here</p>
        <div className="cart-prompcode-input">
          <input type="text" placeholder="promo code" />
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Cart; 
