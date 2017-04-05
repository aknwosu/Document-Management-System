'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../middlewares/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _documents = require('../controllers/documents');

var _documents2 = _interopRequireDefault(_documents);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/users').get(_authentication2.default.requireValidToken, _users2.default.searchUser);

router.route('/documents').get(_authentication2.default.requireValidToken, _documents2.default.searchDocument);

exports.default = router;