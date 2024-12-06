module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define("Inventory",{
      inventoryId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      itemName: DataTypes.STRING,
      category: DataTypes.STRING,
      itemId: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      totalValue: DataTypes.FLOAT,
      assignedTo: DataTypes.STRING,
      datePurchased: DataTypes.DATE,
      note: DataTypes.TEXT,
    });
  
    Inventory.associate = (models) => {
      Inventory.belongsTo(models.Organization);
      Inventory.belongsTo(models.User);
    };
  
    return Inventory;
  };
  