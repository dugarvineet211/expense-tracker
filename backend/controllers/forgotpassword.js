const sgMail = require('@sendgrid/mail');
const uuid=require('uuid');
const bcrypt=require('bcrypt');

const User=require('../models/user');
const ForgotPass=require('../models/forgotpassword');


exports.forgotPassword=async (req,res,next)=>{
    try 
    {
            const email=  req.body.email;
            const user = await User.findOne({where : { email }});
            if(user){
                const id = uuid.v4();
                user.createForgotpassword({ id , active: true })
                    .catch(err => {
                        throw new Error(err)
                    })
                sgMail.setApiKey(process.env.SENGRID_API_KEY)
                const msg={
                    to: email,
                    from: 'dugarvineet211@gmail.com',
                    subject: 'Expense Tracker : Password Reset Link',
                    text: 'Please click on the link below to reset your Expense Tracker Password',
                    html: `<a href="http://localhost:3000/resetpassword/${id}">Reset password</a>`,
                }
    
                sgMail
                .send(msg)
                .then((response)=>
                {
    
                    return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', sucess: true})
    
                })
                .catch((error) => {
                    throw new Error(error);
                })
    
            }
            else
            {
                throw new Error('User doesnt exist')
            }
        } 
        catch(err)
        {
            console.error(err)
            return res.json({ message: err, sucess: false });
        }
}

exports.resetPassword = (req, res) => {
    const id =  req.params.id;
    ForgotPass.findOne({ where : { passwordId }}).then(forgotpasswordrequest => {
        if(forgotpasswordrequest){
            forgotpasswordrequest.update({ active: false});
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
            res.end()

        }
    })
}

exports.updatePassword=(req, res) => {
    try 
    {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        ForgotPass.findOne({ where : { passwordId: resetpasswordid }}).then(resetpasswordrequest => {
            User.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
                if(user)
                {
                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            if(err){
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    });
            } 
            else
            {
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } 
    catch(error)
    {
        return res.status(403).json({ error, success: false } )
    }

}
