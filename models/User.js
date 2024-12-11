module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User",{
      userId: { type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
       },
      email: {type: DataTypes.STRING,allowNull:false},
      firstName: {type: DataTypes.STRING,allowNull:false},
      lastName: {type: DataTypes.STRING,allowNull:false},
      password: {type: DataTypes.STRING,allowNull:false},
      // name: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      department: DataTypes.STRING,
      employeeType: DataTypes.STRING,
      status: DataTypes.STRING,
      currentTask: DataTypes.STRING,
      additionalNotes: DataTypes.TEXT,
      profileUrl: DataTypes.STRING,
      permission: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [
          {
            label: 'Dashboard',
            view: false,
            create: false,
            edit: false,
            transfer: false,
            delete : false,
          },
          {
            label: 'Employee',
            view: false,
            create: false,
            edit: false,
            transfer: false,
            delete : false,          
          },
          {
            label: 'Service',
            view: false,
            create: false,
            edit: false,
            transfer: false,
            delete : false,          
          },
          {
            label: 'Client',
            view: false,
            create: false,
            edit: false,
            transfer: false,
            delete : false,          
          },
          {
            label: 'Finance',
            view: false,
            create: false,
            edit: false,
            transfer: false,
            delete : false,          
          },
          {
            label: 'Reports',
            view: false,
            create: false,
            edit: false,
            transfer: false,
            delete : false,          
          },
          {
            label: 'Inventory',
            view: false,
            create: false,
            edit: false,
            transfer: false,
            delete : false,          
          },
          {
            label: 'Communication',
            view: false,
            create: false,
            edit: false,
            transfer: false,
            delete : false,          
          },
          {
            label: 'Setting',
            view: false,
            create: false,
            edit: false,
            transfer: false,
            delete : false,          
          },
        ],
      },
      role: {
        type: DataTypes.ENUM("Employee","Manager","Super Admin"),
        allowNull: false,
        defaultValue: "Super Admin",
      },
    
    });
  
    User.associate = (models) => {
      User.belongsTo(models.Organization,{
        foreignKey: "orgId", 
        as: "name"
        
      });
      User.hasMany(models.Service);
      User.hasMany(models.Task);
      User.hasMany(models.Task);
      User.hasMany(models.Report);
      User.hasOne(models.Finance);
      User.hasMany(models.Message);
      User.hasOne(models.Inventory);
    };
  
    return User;
  };
  