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
  const Notification = require('./Notifications')(sequelize, DataTypes); // James newly added notification
  const Category = require('./Category')(sequelize, DataTypes); // James newly added Category


  const Chat = require('./Chat')(sequelize, DataTypes)
  const Payment = require('./Payment')(sequelize, DataTypes)
  const Code = require('./Code')(sequelize, DataTypes)

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
    Notification,
    Category,
    Chat,
    Payment,
    Code
  }

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db
