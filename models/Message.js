module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("Message",{
      content: {
        type: DataTypes.TEXT, 
        allowNull: false,
      },
      senderId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
      recipientId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
      sentAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
      },
      readAt: {
        type: DataTypes.DATE, 
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
  