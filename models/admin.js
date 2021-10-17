const Sequelize = require('sequelize')
const db = require('../config/mysql_config')

const Admin = db.define('admin',
  {
    id : {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: {
      type : Sequelize.STRING(100),
      allowNull : false
    },
    password: {
      type : Sequelize.TEXT,
      allowNull : false
    },
    /*created_at: {
      type : Sequelize.DATE,
      allowNull : false
    },
    updated_at: {
      type : Sequelize.DATE,
      allowNull : true
    }*/
  },
  {
    freezeTableName: true,
    timestamps: true
  }
);

module.exports = Admin;