import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from "axios"; // ✅ FIX: You forgot to import axios
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {

  const { url, token, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("sign-up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // ✅ FIXED handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        currState === "sign-up"
          ? `${url}/api/user/register`
          : `${url}/api/user/login`;

      const response = await axios.post(endpoint, data);

      if (response.data.success) {
        toast.success(response.data.message);

        // save token
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        setShowLogin(false); // close popup
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="your name"
              required
            />
          )}

          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="your email"
            required
          />

          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="password"
            required
          />
        </div>

        <button type="submit">
          {currState === "sign-up" ? "Create account" : "login"}
        </button>

        <div className="login-popun-condition">
          <input type="checkbox" required />
          <p>
            By continuing, i agree to the terms of use & privacy policy
          </p>
        </div>

        {currState === "login" ? (
          <p>
            create a new account?{" "}
            <span onClick={() => setCurrState("sign-up")}>click here</span>
          </p>
        ) : (
          <p>
            Already have an account{" "}
            <span onClick={() => setCurrState("login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
