//BUILT-IN MODULES

//INSTALLED MODULES
const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const dotenv = require('dotenv');

//USER DEFINED MODULES
const sequelize=require('./util/database');
const User=require('./models/user');
const Expense=require('./models/expenses');
const userRoutes = require('./routes/user');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })