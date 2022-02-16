//BUILT-IN MODULES

//INSTALLED MODULES
const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const dotenv = require('dotenv');

//USER DEFINED MODULES
const sequelize=require('./util/database');
const User=require('./models/user');
const userRoutes = require('./routes/user');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes);

sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })