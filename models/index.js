const { DataTypes } = require('sequelize');
const sequelize = require("../config/db")


  const Organization =  require('./Organization')(sequelize, DataTypes)
  const User = require('./User')(sequelize, DataTypes)
  const Service = require('./Service')(sequelize, DataTypes)
  const Task =  require('./Task')(sequelize, DataTypes)
  const Client = require('./Client')(sequelize, DataTypes)
  const Inventory =  require('./Inventory')(sequelize, DataTypes)
  const Report = require('./Report')(sequelize, DataTypes)
  const Finance = require('./Finance')(sequelize, DataTypes)
  const Message = require('./Message')(sequelize, DataTypes)
  const Plan = require('./Plan')(sequelize, DataTypes)
  

  const db = {
    Organization,
    User,
    Service,
    Task,
    Client,
    Inventory,
    Report,
    Finance,
    Message,
    Plan

  }

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db
