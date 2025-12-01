import React, { useContext } from 'react';

import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext.jsx';

const PlaceOrder = () => {
  const { getTotalCartAmmout } = useContext(StoreContext);

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input type="text" placeholder='first name' />
          <input type="text" placeholder='last name' />
        </div>
        <input type="email" placeholder='enter email' />
        <input type="text" placeholder='street' />
        <div className="multi-fields">
          <input type="text" placeholder='enter city' />
          <input type="text" placeholder='enter country' />
        </div>
        <input type="text" placeholder='phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
        </div>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>₹{getTotalCartAmmout().toLocaleString("en-IN")}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>₹2</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <b>Total</b>
          <b>₹{(getTotalCartAmmout() + 2).toLocaleString("en-IN")}</b>
        </div>
        <button type="button" >
          Proceed to payment
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
