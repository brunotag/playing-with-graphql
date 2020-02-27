const { Sequelize, DataTypes } = require('sequelize');

Author = (sequelize) => {
    return sequelize.define('author', {
        id: { type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true},
        name: DataTypes.STRING,
        age: DataTypes.INTEGER
    });
}

Book = (sequelize) => {
    return sequelize.define('book', {
        id: { type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true},
        name: DataTypes.STRING,
        genre: DataTypes.STRING,
        author_id: {
            type: Sequelize.INTEGER,    
            references: {        
                model: Author(sequelize),
                key: 'id'
            }
        },    
    });
}

module.exports = {
    Author,
    Book
}