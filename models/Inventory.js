module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define("Inventory",{
      inventoryId: { type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
       },
      itemName: DataTypes.STRING,
      category: DataTypes.STRING,
      itemId: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      totalValue: DataTypes.FLOAT,
      assignedTo: DataTypes.STRING,
      datePurchased: DataTypes.DATEONLY,
      note: DataTypes.TEXT,
    });
  
    Inventory.associate = (models) => {
      Inventory.belongsTo(models.Organization);
      Inventory.belongsTo(models.User);
      Inventory.belongsTo(models.Category, { foreignKey: 'categoryId' });

    };
  
    return Inventory;
  };
  