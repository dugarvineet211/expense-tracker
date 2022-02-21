const sgMail = require('@sendgrid/mail');

const User=require('../models/user');


exports.forgotPassword=(req,res,next)=>{
    try{
        const email=req.body.email;
        console.log(email);
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const message={
            to:email,
            from:'dugarvineet211@gmail.com',
            subject:'DEMO EMAIL',
            text:'THIS IS A DUMMY EMAIL',
            html:'<h2>Dummy EMAIL</h2>'
        };
        sgMail.send(message)
        .then((response)=>{
            res.status(response[0].statusCode).json({message:'Email Sent!',success:true})
        })
        .catch(err=>{
            throw new Error(err)
        });
    }
    catch(err){
        res.json({message:err,success:false});
    }
}