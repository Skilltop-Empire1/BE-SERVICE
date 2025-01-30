// models/Notification.js
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define("Notification", {
        notificationId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("Unread", "Read"),
            defaultValue: "Unread",
        },
        
    });
    
    Notification.associate = (models) => {
        Notification.belongsTo(models.User, { foreignKey: "userId" });
    };
    
    return Notification;
};