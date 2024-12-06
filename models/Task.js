module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task",{
      taskId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      taskTitle: DataTypes.STRING,
      priority: DataTypes.STRING,
      dueDate: DataTypes.DATE,
      taskStatus: DataTypes.STRING,
      description: DataTypes.TEXT,
      fileUrl: DataTypes.STRING,
    });
  
    Task.associate = (models) => {
      Task.belongsTo(models.Service);
    };
  
    return Task;
  };
  