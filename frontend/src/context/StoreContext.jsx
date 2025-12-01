import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext();
import {toast} from "react-toastify"

const StoreContextProvider = (props) => {

  const [cartItems, setcartItems] = useState({});
  const url = "http://localhost:8000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([])


  const addToCart = async (itemId) => {

    if(!token) {
     return toast.info("Please login first");
    }
    if (!cartItems[itemId] && token) {
      setcartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      console.log(token)
    }

    if(token) {
      await axios.post(`${url}/api/cart/add`,{itemId},{headers:{token}})
    }
  };
  const removeToCart =async (itemId) => {
    setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if(token) {
      await axios.post(`${url}/api/cart/remove`,{itemId},{headers:{token}})
    }
  };

  const localCartData = async (token) => {
  try {
    const response = await axios.get(url + "/api/cart/get", { headers: { token } });
    setcartItems(response.data.cartData || {});
    console.log(response.data.cartData+"asdfgj")
    console.log(response.data.data.cartData+"dsfghjkl")

  } catch (err) {
    console.error("Failed to load cart data", err);
  }
};


  const getTotalCartAmmout = () => {
    let totalAmmout = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmmout += itemInfo.price * cartItems[item];
      }
    }
    return totalAmmout;
  };

  const fetchData  = async()=> {
    try {
   const responce = await  axios.get(`${url}/api/fbn/list`)
    console.log("data is successfully loaded")
    setFoodList(responce.data.data)
    } catch(err) {
    console.error("data loaded error",err);
    }
  }

  useEffect(()=> {
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
      localCartData(localStorage.getItem("token"))
    }
    fetchData();

  },[])
  const contextValue = {
    food_list,
    addToCart,
    removeToCart,
    cartItems,
    setcartItems,
    getTotalCartAmmout,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
