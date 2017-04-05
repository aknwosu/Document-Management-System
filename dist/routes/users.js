'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../middlewares/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').post(_users2.default.createUser).get(_authentication2.default.requireValidToken, _authentication2.default.validUser, _users2.default.getUsers);

router.route('/createAdminUser').post(_authentication2.default.requireValidToken, _authentication2.default.isAdmin, _users2.default.createAdminUser);

router.route('/:id').get(_authentication2.default.requireValidToken, _authentication2.default.isOwnerOrAdmin, _users2.default.findUser).put(_authentication2.default.requireValidToken, _authentication2.default.validUser, _users2.default.updateUser).delete(_authentication2.default.requireValidToken, _authentication2.default.isAdmin, _users2.default.deleteUser);

router.route('/login').post(_users2.default.login);

router.route('/logout').post(_users2.default.logout);

router.route('/:id/documents').get(_authentication2.default.requireValidToken, _authentication2.default.validUser, _users2.default.getUserDocuments);

exports.default = router;