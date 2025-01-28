const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define("Chat", {
    chatId: { type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
           },
      members: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      }
    }, 
    {
      timestamps: true,  
    });

    Chat.associate = (Models) =>{
        Chat.hasMany(Models.Message)
    }
  
    return Chat;  
  };
  