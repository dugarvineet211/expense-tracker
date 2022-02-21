const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const ForgotPass=sequelize.define('forgotpassword',{
    id:{
        type:Sequelize.UUID,
        allowNull:false,
        isPrimaryKey:true
    },
    active:Sequelize.BOOLEAN,
    expiresBy:Sequelize.DATE
});

module.exports=ForgotPass;