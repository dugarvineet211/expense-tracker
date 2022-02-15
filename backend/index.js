//BUILT-IN MODULES

//INSTALLED MODULES
const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');

//USER DEFINED MODULES
const sequelize=require('./util/database');
const User=require('./models/user');

const app = express();
app.use(cors());

sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })