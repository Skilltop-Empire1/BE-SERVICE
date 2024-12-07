module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("Message",{
      content: {
        type: DataTypes.TEXT, 
        allowNull: false,
      },
      senderId: {
        type: DataTypes.UUID, 
        allowNull: false,
      },
      recipientId: {
        type: DataTypes.UUID, 
        allowNull: false,
      },
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
      Message.belongsTo(models.User, { as: 'sender', foreignKey: 'senderId' });
      Message.belongsTo(models.User, { as: 'recipient', foreignKey: 'recipientId' });
    };
  
    return Message;
  };
  