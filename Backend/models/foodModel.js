import mongoose from "mongoose";


const FoodSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        type :String,
        required :true,
    },
    price : {
        type :String,
        required :true,
    },
    image : {
        type : String, 
        required : true,
    },
    category : {
        type : String,
        required : true,
    }
})

const FoodModel = mongoose.models.food || mongoose.model("Food",FoodSchema);

export default FoodModel