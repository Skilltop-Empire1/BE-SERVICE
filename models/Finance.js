module.exports = (sequelize, DataTypes) => {
    const Finance = sequelize.define("Finance",{
      financeId: { type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
       },
       userId: {
        type: DataTypes.UUID,
        references: { model: 'Users', key: 'userId' },
      },
      expenseCategory: DataTypes.STRING,
      expensesDescription: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      dateOfExpenses: DataTypes.DATE,
      type: {
        type: DataTypes.ENUM('OPEX', 'CAPEX'),
        allowNull: false,
      },
      paymentMethod: DataTypes.STRING,
      vendorPayee: DataTypes.STRING,
      note: DataTypes.TEXT,
      fileUrl: DataTypes.STRING,
      capexCategory: DataTypes.STRING,
      assetDescription: DataTypes.STRING,
      expectedLifeSpan: DataTypes.INTEGER,
      depreciationRate: DataTypes.FLOAT,
    });
  
    Finance.associate = (models) => {
      Finance.belongsTo(models.User);
    };
  
    return Finance;
  };
  