const { DataTypes } = require('sequelize');
const DBConnection = require('../DB/DBConnection');

const Assignment = DBConnection.define('assignment', {
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    borrowedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    returnedAt: {
        type: DataTypes.DATE,
        defaultValue: null
    }
},
{
    tableName:"assignment"
});

module.exports = Assignment;
