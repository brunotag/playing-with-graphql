const model = require('../model/model')

const sequelize = require('./connections').superUserConnection;

const Author = model.Author(sequelize);
const Book = model.Book(sequelize);


Author.sync({force: false})
    .then(() => {
        Author.create({ name: 'Carlo Verdi', age:45});
        Author.create({ name: 'Luigi Bianchi', age:47});
        Author.create({ name: 'Mario Rossi', age:49});
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    })

Book.sync({force: false})
    .then(() => {
        Book.create({ name: 'Via col vento', genre: 'Pesanton', id: '1', author_id: '1'});
        Book.create({ name: 'Il codice Da Vinci', genre: 'Trash', id: '2', author_id: '2'});
        Book.create({ name: 'Pinocchio', genre: 'Scuola', id: '3', author_id: '3'});
        Book.create({ name: 'Petomania', genre: 'Comico', id: '4', author_id: '1'});
        Book.create({ name: 'Natale in Birmania del sud', genre: 'Trash', id: '5', author_id: '2'});
        Book.create({ name: 'Alluce valgo e altri malanni', genre: 'Medicina', id: '6', author_id: '3'});
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    })    

