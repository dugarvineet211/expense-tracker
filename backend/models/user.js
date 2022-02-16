const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: {
    type:  Sequelize.STRING,
    unique:true,
    allowNull:false,
    },
  phone:Sequelize.BIGINT,
  password:Sequelize.STRING,
});

module.exports = User;
