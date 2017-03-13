import path from 'path';

import users from './users';
import documents from './documents';
import search from './search';

export default (app) => {
  // Index route
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client', 'index.html'));
  });

  app.use('/documents', documents);
  app.use('/users', users);
  app.use('/search', search);
  app.use('/search', documents);
};
