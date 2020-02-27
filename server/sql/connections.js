const {Sequelize} = require('sequelize')

const superUserConnection = new Sequelize('GraphqlBookstore', 'GraphqlBookstoreSuperUser', 'p4$$w0rd', {
    dialect: 'mssql',
    dialectOptions: {
        options: {
        useUTC: false,
        dateFirst: 1
        }
    }
})

const normalUserConnection = new Sequelize('GraphqlBookstore', 'GraphqlBookstoreUser', 'p4$$w0rd', {
    dialect: 'mssql',
    dialectOptions: {
        options: {
        useUTC: false,
        dateFirst: 1
        }
    }
})

module.exports = {
    superUserConnection,
    normalUserConnection
}