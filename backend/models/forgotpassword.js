const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const ForgotPass=sequelize.define('forgotpassword',{
    passwordId:{
        type:Sequelize.UUID,
        allowNull:false,
        isPrimaryKey:true
    },
    active:Sequelize.BOOLEAN,
    expiresBy:Sequelize.DATE
});

module.exports=ForgotPass;