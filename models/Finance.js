module.exports = (sequelize, DataTypes) => {
    const Finance = sequelize.define("Finance",{
      financeId: { type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
       },
      expenseCategory: DataTypes.STRING,
      expensesDescription: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      dateOfExpenses: DataTypes.DATE,
      paymentMethod: DataTypes.STRING,
      vendorPayee: DataTypes.STRING,
      note: DataTypes.TEXT,
      fileUrl: DataTypes.STRING,
      capexCategory: DataTypes.STRING,
      assetDescription: DataTypes.STRING,
      expectedLifeSpan: DataTypes.STRING,
      depreciationRate: DataTypes.FLOAT,
    });
  
    Finance.associate = (models) => {
      Finance.belongsTo(models.User);
    };
  
    return Finance;
  };
  