const brcypt=require('bcrypt');
const User=require('../models/user');

exports.signup=(req,res,next)=>{

  const name=req.body.name;
  const email=req.body.email;
  const phone=req.body.number;
  const password=req.body.password;

    const saltRound=10;
    brcypt.genSalt(saltRound,function(err,salt){
        brcypt.hash(password,salt,function(err,hash){
                User.create({name,email,phone,password:hash})
                .then(()=>
                {
                    res.status(201).json({success:true,message:'User successfully created! You may login now!'});
                })
                .catch((err)=>{
                    res.status(403).json(err);
                });
        });
    });
}