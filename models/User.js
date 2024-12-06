module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User",{
      userId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      role: DataTypes.STRING,
      department: DataTypes.STRING,
      employeeType: DataTypes.STRING,
      status: DataTypes.STRING,
      currentTask: DataTypes.STRING,
      additionalNotes: DataTypes.TEXT,
      profileUrl: DataTypes.STRING,
    });
  
    User.associate = (models) => {
      User.belongsTo(models.Organization);
      User.hasMany(models.Service);
      User.hasMany(models.Task);
      User.hasMany(models.Report);
      User.hasOne(models.Finance);
      User.hasMany(models.Message);
      User.hasOne(models.Inventory);
    };
  
    return User;
  };
  