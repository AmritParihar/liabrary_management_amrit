const { DataTypes } = require('sequelize');
const DBConnection = require('../DB/DBConnection');
const Assignment = require('../Model/assign');

const Book = DBConnection.define('books', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 100]
        }
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 50]
        }
    },
    status: {
        type: DataTypes.ENUM('available', 'assigned'),
        allowNull: false,
        defaultValue: 'available'
    }
},{
    tableName:'books'
}
);

// Define associations
Book.hasMany(Assignment, { foreignKey: 'bookId', onDelete: 'CASCADE' });
Assignment.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = Book;
