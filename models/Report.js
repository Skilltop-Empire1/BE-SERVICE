module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define("Report",{
      reportId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      reportTitle: DataTypes.STRING,
      reportType: DataTypes.STRING,
      dateRangeFrom: DataTypes.DATE,
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
  