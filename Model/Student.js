const { DataTypes } = require('sequelize');
const DBConnection = require('../DB/DBConnection');
const Assignment = require('../Model/assign');

const Student = DBConnection.define('students', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 50],
            isAlpha: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    }
},{
    tableName: 'students'
});

// Define associations
Student.hasMany(Assignment, { foreignKey: 'studentId', onDelete: 'CASCADE' });
Assignment.belongsTo(Student, { foreignKey: 'studentId' });

module.exports = Student;
