import path from 'path';

import express from 'express';
import parser from 'body-parser';
import logger from 'morgan';
import routes from './routes/index';

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(logger('dev'));
app.use(express.static(path.resolve('client', 'public')));

// Mount routes
routes(app);

export default app;
