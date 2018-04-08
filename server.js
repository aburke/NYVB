const express = require('express');
const app = express();
require('./routes.js')(app);

app.listen(3001)
console.log("Server started....")