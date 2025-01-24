const { subscribe } = require("../routes/userRoutes");

module.exports = (sequelize, DataTypes) => {
    const Subscription = sequelize.define("Subscription",{
      inventoryId: { type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
       },
      businessName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      subscribedPlan: DataTypes.STRING,
      subscriptionCode: DataTypes.STRING,
    });
  
    // Inventory.associate = (models) => {
    //   Inventory.belongsTo(models.Organization);
    //   Inventory.belongsTo(models.User);
    // };
  
    return Subscription;
  };
  