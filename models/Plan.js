module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define("Plan",{
     planId: { type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
     },
    businessName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    subscribedPlan: DataTypes.STRING,
    subscriptionCode: DataTypes.STRING,
   
  });

  return Plan;
};

