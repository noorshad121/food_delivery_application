import React, { useEffect, useState } from 'react'
import "./List.css"
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {

  const [list,setList] = useState([]);

//  show food data
  const fetchList = async()=> {
    const response = await axios.get(`${url}/api/fbn/list`)
    if(response.data.success) {
      setList(response.data.data)
    }
    else { 
      toast.error("error")
    }
  }

  // delete food data
  const removeFood = async (foodid) => {
  try {
    const responce =  await axios.delete(`${url}/api/fbn/remove/${foodid}`);
    await fetchList(); // refresh list
    toast.success(responce.data.message);
  } catch (err) {
    console.log(err);
    toast.error("food item deleted error");
  }
};



  useEffect(()=> {
    fetchList();
    console.log(list)
  },[])
  return (
    <div className='list add flex-col'>
      <p className='list-p'>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=> {
          return(
            <div key={index} className='list-table-format list-table-format-items'>
              <img src={`${url}/image/`+item.image} width="60px" alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(item.price)}
        </p>
              <p onClick={()=> removeFood(item._id)} className='crs'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
