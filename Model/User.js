const { DataTypes } = require('sequelize');
const DBConnection = require('../DB/DBConnection');

const User = DBConnection.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [4, 30], // Username length between 4 and 30 characters
            isAlphanumeric: true // Only allows letters and numbers
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [8, 100] // Minimum password length of 8 characters
        }
    },
    role: {
        type: DataTypes.ENUM('admin', 'student'),
        allowNull: false,
        validate: {
            isIn: [['admin', 'student']] // Only allow admin and student as roles
        }
    }
}, {
    tableName: 'user', // Explicitly set the table name
    timestamps: true // Ensure createdAt and updatedAt columns are managed
});

module.exports = User;
