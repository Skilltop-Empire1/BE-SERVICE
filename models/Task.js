module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task",{
      taskId: { type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
       },
      taskTitle: DataTypes.STRING,
      priority: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["Low", "Medium", "High"]],
        },
      },
      dueDate: DataTypes.DATEONLY,
      taskStatus: {
        type: DataTypes.STRING,
        defaultValue: "To do",
        validate: {
          isIn: [["To do", "In Progress", "Completed", "Cancelled"]],
        },
      },
      description: DataTypes.TEXT,
      fileUrl: {
        type:DataTypes.STRING,
        defaultValue:null
      },
    });
  
    Task.associate = (models) => {
      Task.belongsTo(models.Service,{
        foreignKey:"serviceId",
        //as:"service"
      });
      Task.belongsTo(models.User, {
        foreignKey: "userId",
        //as: "assignTo",
      });
    };
  
    return Task;
  };
  