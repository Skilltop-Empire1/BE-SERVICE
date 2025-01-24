module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define("Client",{
       clientId: { type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
       },
      name: DataTypes.STRING,
      phoneNo: DataTypes.STRING,
      email: DataTypes.STRING,
      DOB: DataTypes.DATE,
      address: DataTypes.STRING,
      category: DataTypes.STRING,
      description: DataTypes.TEXT,
    });
  
    Client.associate = (models) => {
      Client.hasMany(models.Service);
    };
  
    return Client;
  };
  