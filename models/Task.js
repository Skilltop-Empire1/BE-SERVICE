module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task",{
      taskId: { type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
       },
      taskTitle: DataTypes.STRING,
      priority: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      taskStatus: DataTypes.STRING,
      description: DataTypes.TEXT,
      fileUrl: DataTypes.STRING,
    });
  
    Task.associate = (models) => {
      Task.belongsTo(models.Service);
    };
  
    return Task;
  };
  