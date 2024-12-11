
module.exports = (sequelize,DataTypes) => {
  const Organization = sequelize.define("Organization",{
    orgId: { type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });

  Organization.associate = (models) => {
    Organization.hasMany(models.User,{
      foreignKey:"orgId",
      as:"user"
    });
    Organization.hasMany(models.Service);
    Organization.hasMany(models.Client);
    Organization.hasMany(models.Inventory);
    Organization.hasMany(models.Finance);
    Organization.hasMany(models.Report);
  };

  return Organization;
};
