import jwt from "jsonwebtoken";
 const authMiddleware = async (req, res, next) => {
   try {
     const { token } = req.headers;
       // frontend se aaya token
        if (!token) {
          return res.json({ success: false, message: "Please login first" }); 
         }
    
    // Token verify — CORRECT way
          const token_decode = jwt.verify(token, process.env.JWT_SECRET); 
          
          // Save user ID in req.body
           req.body.userId = token_decode.id;
            next();
          
          } catch (err) { 
            return res.json({ success: false, message: "Invalid or expired token" }); } };
            
            export { authMiddleware };
