module.exports = (sequelize, DataTypes) => {
    const  Service = sequelize.define("Service",{
      serviceId: { type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      serviceName: DataTypes.STRING,
      // category: DataTypes.STRING,
      price: DataTypes.FLOAT,
      duration: DataTypes.STRING,
      // serviceStatus: DataTypes.STRING,
      serviceManager: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      dateAdded : {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
      // completionDate: DataTypes.DATE,
      // promotion: DataTypes.STRING,
      description: DataTypes.TEXT,
    });
  
    Service.associate = (models) => {
      Service.belongsTo(models.Organization);
      Service.belongsTo(models.User);
      Service.hasMany(models.Task);
      Service.hasMany(models.Client);
    };
  
    return Service;
  };
  