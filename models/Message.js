module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("Message",{
      msgId: { type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
       },
      content: {
        type: DataTypes.TEXT, 
        allowNull: true,
      },
      // chatId: {
      //   type: DataTypes.UUID, 
      //   allowNull: false,
      // },
      senderId: {
        type: DataTypes.UUID, 
        allowNull: false,
      },
      // recipientId: {
      //   type: DataTypes.UUID, 
      //   allowNull: false,
      // },
      sentAt: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW, 
      },
      readAt: {
        type: DataTypes.DATEONLY, 
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('sent', 'delivered', 'read'), 
        defaultValue: 'sent',
      },
    });
  
    Message.associate = (models) => {
      //Message.belongsTo(models.User, { as: 'sender', foreignKey: 'senderId' });
      //Message.belongsTo(models.User, { as: 'recipient', foreignKey: 'recipientId' });
      Message.belongsTo(models.Chat, { foreignKey: 'chatId' });
    };
  
    return Message;
  };
  