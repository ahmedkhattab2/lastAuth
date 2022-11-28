const jwt=require('jsonwebtoken');
module.exports=async(req,res,next)=>{
  try {
    const token=req.headers.authorization.split(" ")[1]
   const decode=jwt.verify(token,"ADMIN"); 
  req.userData=decode;
  next();
  } catch (error) {
    return res.json({
        massge:'auth for  admin is error'
    });
    
  }
}