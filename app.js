const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const { Sequelize } = require('sequelize');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const sequelize = new Sequelize('GraphqlBookstore', 'GraphqlBookstoreUser', 'p4$$w0rd', {
    dialect: 'mssql',
    dialectOptions: {
        // Observe the need for this nested `options` field for MSSQL
        options: {
        // Your tedious options here
        useUTC: false,
        dateFirst: 1
        }
    }
})

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    })

const portNumber = 4000;
app.listen(portNumber, () => {
    console.log('now listening for requests on port ' + portNumber);
})