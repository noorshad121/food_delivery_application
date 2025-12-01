import FoodModel from "../models/foodModel.js";
import fs from "fs";

// -------------------------------------
// Add Food Item
// -------------------------------------
const addFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image file is required",
    });
  }

  const image = req.file.filename;
  const { name, description, price, category } = req.body;

  const food = new FoodModel({
    name,
    price,
    description,
    category,
    image,
  });

  try {
    await food.save();
    res.status(201).json({
      success: true,
      message: "Food added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error adding food",
      error: err.message,
    });
  }
};

// -------------------------------------
// Get All Food List
// -------------------------------------
const listFood = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error loading food list",
      error: err.message,
    });
  }
};

// -------------------------------------
// Remove Food Item
// -------------------------------------
const removeFood = async (req, res) => {
  try {
    const foodId = req.params.id;

    // Check if item exists
    const food = await FoodModel.findById(foodId);
    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    // Delete the image file
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.log("Image delete error:", err);
    });

    // Delete from DB
    await FoodModel.findByIdAndDelete(foodId);

    return res.status(200).json({
      success: true,
      message: "Food item deleted successfully",
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete food item",
      error: err.message,
    });
  }
};

export { addFood, listFood, removeFood };
