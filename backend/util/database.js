const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-tracker', 'root', '22nachoS!', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;