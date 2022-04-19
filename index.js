require('dotenv').config();
const winston = require('winston');
const express = require('express');
const app = express();

require('./config/logger.js')();
require('./config/routes.js')(app);
require('./config/db.js')();

const port = process.env.PORT;

app.listen(port, () => {
    winston.info(`Server is running at port ${port} and ${process.env.NODE_ENV} environment`);
});