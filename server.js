import path from 'path';
import webpack from 'webpack';
import config from './webpack.config.dev';
import express from 'express';
import parser from 'body-parser';
import logger from 'morgan';
import routes from './server/routes/index';

const app = express();
// app.use(express.static('client/public'));
console.log(`${__dirname}/client/index.html}`);
app.use(parser.urlencoded({
  extended: true
}));
app.use(parser.json());
app.use(logger('dev'));

require('dotenv').config();

const compiler = webpack(config);

if (process.env.NODE_ENV !== 'test') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}
// Mount routes
routes(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/index.html`));
});
const port = process.env.PORT || 4000;

// Start server
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

export default app;
