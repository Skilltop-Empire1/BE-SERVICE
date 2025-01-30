// const { Model } = require("sequelize");

// module.exports = (sequelize, DataTypes) => {
//     const Chat = sequelize.define("Chat", {
//     chatId: { type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//            },
//       members: {
//         type: DataTypes.ARRAY(DataTypes.STRING),
//         allowNull: false,
//       }
//     }, 
//     {
//       timestamps: true,  
//     });

//     Chat.associate = (Models) =>{
//         Chat.hasMany(Models.Message)
//     }
  
//     return Chat;  
//   };
  
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define("Chat", {
    chatId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    members: {
      type: DataTypes.ARRAY(DataTypes.UUID), // List of user IDs
      allowNull: false,
      index: true
    },
    isGroup: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    groupName: {
      type: DataTypes.STRING,
      allowNull: true, // Only for group chats
    },
    admins: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true, // List of admin IDs
    },
  }, { timestamps: true });

  Chat.associate = (models) => {
    Chat.hasMany(models.Message, { foreignKey: 'chatId' });
  };

  return Chat;
};
