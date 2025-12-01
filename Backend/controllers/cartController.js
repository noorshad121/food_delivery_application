import userModel from "../models/userModel.js";

// add to user cart
const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData;

    // itemId exists? Add or increment
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    // save changes to DB
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});

    res.json({ success: true, message: "Item added to cart successfully", cartData });

  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error adding item to cart" });
  }
};

const removeToCart = async(req,res)=> {
 try {
  const userData = await userModel.findById(req.body.userId);

  if(!userData) {
   return res.json({success: false, message : "first you need to login"})
  }

  const cartData = userData.cartData;

  if(cartData[req.body.itemId] > 0){
    cartData[req.body.itemId] -= 1;
  }
  else {
   return res.json({success: false, message:"cart is empty"})
  }

  await userModel.findByIdAndUpdate(req.body.userId, {cartData})

  res.json({success:true, message : "remove to cart successfully",cartData})
  
} catch(err){
  console.log(err)
  res.json({success:false,message: "remove to cart error"})
}


}

// const getToCart = async(req,res)=> {
 
//   try {
 
//     const userData = await userModel.findById(req.body.userId);
//     let cartData = userData.cartData;
//     if(!cartData){
//       return res.json({sucesss: false, message : "cart is empty"})
//     }
//     res.json({success : true,cartData})
//   } catch(err) {
//     console.log(err)
//     res.json({success:true, message:"error"})
//   }
// }


const getToCart = async(req,res)=> {
  try {
    const userData = await userModel.findById(req.userId);

    if(!userData.cartData){
      return res.json({success: false, message: "cart is empty"});
    }

    res.json({success: true, cartData: userData.cartData});

  } catch(err) {
    console.log(err);
    res.json({success: false, message:"error"});
  }
}



export {addToCart, removeToCart, getToCart}
