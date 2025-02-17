module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define("Report",{
      reportId: { type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
       },
       userId: {
        type: DataTypes.UUID,
        references: { model: 'Users', key: 'userId' },
      },
      reportTitle: DataTypes.STRING,
      reportType: DataTypes.STRING,
      dateRangeFrom: DataTypes.DATEONLY,
      dateRangeTo: DataTypes.DATE,
      report: DataTypes.TEXT,
      fileUrl: DataTypes.STRING,
    });
  
    Report.associate = (models) => {
      Report.belongsTo(models.Organization);
      Report.belongsTo(models.User);
    };
  
    return Report;
  };
  