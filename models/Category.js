module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      categoryId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false }
    });
  
    Category.associate = (models) => {
      Category.belongsTo(models.Organization, { foreignKey: 'orgId' });
      Category.hasMany(models.Inventory, { foreignKey: 'categoryId' });
      Category.belongsTo(models.User, { foreignKey: 'userId' });

    };
  
    return Category;
  };
  