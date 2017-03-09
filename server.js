const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./server/route');

const PORT = 4000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
