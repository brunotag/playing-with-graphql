const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const portNumber = 4000;
app.listen(portNumber, () => {
    console.log('now listening for requests on port ' + portNumber);
})