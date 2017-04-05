'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _documents = require('./documents');

var _documents2 = _interopRequireDefault(_documents);

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

var _roles = require('./roles');

var _roles2 = _interopRequireDefault(_roles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  // Index route
  app.get('/', function (req, res) {
    res.sendFile(_path2.default.resolve('client', 'index.html'));
  });

  app.use('/documents', _documents2.default);
  app.use('/users', _users2.default);
  app.use('/search', _search2.default);
  app.use('/search', _documents2.default);
  app.use('/roles', _roles2.default);
};