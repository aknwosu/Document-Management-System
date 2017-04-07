
import path from 'path';
import express from 'express';
import open from 'open';
import parser from 'body-parser';
import compression from 'compression';
import routes from '../server/routes/index';


// import app from '../server';


/* eslint-disable no-console */

const port = parseInt(process.env.PORT, 10) || 4000;
const app = express();
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(compression());
app.use(express.static('dist'));

app.get('/*', function (req, res) {
  console.log('path', path.join(__dirname, '../dist/index.html'));
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

routes(app);

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port ${port}`);
    open(`http://localhost:${port}`);
  }
});

app.timeout = 10000;
