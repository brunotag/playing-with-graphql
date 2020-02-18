const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({
    
}));

const portNumber = 4000;
app.listen(portNumber, () => {
    console.log('now listening for requests on port ' + portNumber);
})