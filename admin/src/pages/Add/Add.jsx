import React, { useState } from "react";
import axios from "axios";
import "./Add.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const Add = ({url}) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    // FIXED — Correct FormData
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("description", data.description);
    formdata.append("price", Number(data.price));
    formdata.append("category", data.category);
    formdata.append("image", image);

    try {
      const response = await axios.post(`${url}/api/fbn/add`, formdata);

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });

        setImage(null);
        toast.success(response.data.message)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (err) {
      console.log(err);
      toast.error(resizeBy.data.message)
    }
  };

  return (
    <div className="add">
      <form onSubmit={submitHandler} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="type here"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            rows="6"
            onChange={onChangeHandler}
            value={data.description}
            placeholder="write content here..." required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="price..." 
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
