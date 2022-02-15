const brcypt=require('bcrypt');
const User=require('../models/user');

exports.signup=(req,res,next)=>{

    const {
        name,email,phone,password
    }=req.body;
    const saltRound=10;
    brcypt.genSalt(saltRound,function(err,salt){
        brcypt.hash(password,salt,function(err,hash){
                if(err)
                {
                    res.send('<h1>UNABLE TO SIGNUP!!</h1>');
                }
                User.create({name,email,phone,password:hash})
                .then(()=>
                {
                    res.status(201).send('<h1>Successfully Created User');
                })
                .catch((err)=>{
                    res.status(400).send('<h1>UNABLE TO SIGNUP! PLEASE RECHECK EMAIL! USER EXISTS!');
                });
        });
    });
}