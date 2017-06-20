import path from 'path';

import users from './users';
import documents from './documents';
import search from './search';
import roles from './roles';

export default (app) => {
  // Index route
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client', 'index.html'));
  });

  app.use('/api/documents', documents);
  app.use('/api/users', users);
  app.use('/api/search', search);
  app.use('/api/search', documents);
  app.use('/api/roles', roles);
};
