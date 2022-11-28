const AUTH1=require('../model/Auth-model')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose');
const { use } = require('../Route/authRouter');

 module.exports={
//     login:(req,res,next)=>{
// var email=req.body.email;
// var password=req.body.password; 
// var user2=  AUTH1.findOne({$or:[{email:email},{password:password}]}).then(user=>{
//     if(user){
//         bcrypt.compare(password,user.password,(err,result)=>{
//             if(err){
//                 res.json({
//                     massege:"eroooooooor"
//                 })
//             }
//             if(result){
                
//                      token=jwt.sign({email:user2.email,name: user2.name},"USER");
//                     res.json({massege:'user logged in',

                
//                 token
              
//         })}
              
            
//             else{
//                 res.json({
//                     massege:'password not valid'
//                 })
//             }
//         })
//     }
//     else{
//         res.json({
//             massege:'user not found'
//         })
//     }
// })
//     },

    // signup:(req,res,next)=>{
    //     bcrypt.hash(req.body.password,10,function(err,hashpass){
    //         if(err){
    //             res.json({error:err})
    //         }
    //         let user =new AUTH1({
    //             name:req.body.name,
    //             email:req.body.email,
    //             type:req.body.type,
    //             password:hashpass
    //         })
    //         user.save().then(user=>{
    //             res.json({
    //                 masseg:'user added sucess'
    //             })
    //         })
    //         .catch(error=>{
    //             res.json({
    //                 'masseg':'erorrrrrr'
    //             })
    //         })
    //     })
       
    // }

    signup:async(req,res)=>{
      var  user =await AUTH1.find({'email' : req.body.email}) ;
       if( user.length>=1){
        return res.json({massege:'this email already exist'});
       } 
       else{
       
        bcrypt.hash(req.body.password,10,async (error,hash)=>{
        if(error ){
             res.json({massege:"error in pgggassword"});
        }
        else{
            const auth=await new AUTH1({
                name:req.body.name,
                email:req.body.email,
                password:hash,
                type:req.body.type,
            }).save() ;
            res.json({
                massege:'success',
                email:auth.email,
                name:auth.name,
                password:auth.hash,
                type:auth.type
            });
             
        }
       });
    }
    } ,
// login:(req,res,next)=>{
//      auth.AUTH.find({email :req.body.email}).exec().then(user=>{
//         if(user.length<1){
//             return res.status(404).json({
//                 mess:"auth faild"
//             });
//         }
//         bcrypt.compare(req.body.password,user[0].password,(error,result)=>{
//             if(err){
//                 return res.status(404).json({
//                     mess:"auth faild"
//                 });
//             }
//             if (result){
                 
                
//             }
//         })
//     });
// }


   login:async(req,res)=>{
var user = await AUTH1.find({email:req.body.email});
if(user.length<1){
    return res.json({massge:"this email not exist"});

}
else{
    bcrypt.compare(req.body.password,user[0].password,async(err,result)=>{
        if(err){
            return res.json({massege:'password not exist'})
        }
        if(result){
            if(user[0].type==0){
                var token=jwt.sign({email:user[0].email,name: user[0].name},"USER");
                res.json({massege:'user logged in',
            email:user[0].email,
            usertype:user[0].type,
            token:token 
            })
            }
            else{
                var token=jwt.sign({email:user[0].email,name: user[0].name},"ADMIN");
             return   res.json({massege:'admin logged in',
            email:user[0].email,
            usertype:user[0].type,
            token:token 
            }) ;
            }
        }
        else{
            res.json({
                massege:'password not valid'
            })
             }
    });
}
    }
} 





