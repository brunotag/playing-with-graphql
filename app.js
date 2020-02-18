const express = require('express')
const app = express();

const portNumber = 4000
app.listen(portNumber, () => {
    console.log('now listening for requests on port ' + portNumber)
})