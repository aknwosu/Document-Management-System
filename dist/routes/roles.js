'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../middlewares/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _roles = require('../controllers/roles');

var _roles2 = _interopRequireDefault(_roles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').post(_authentication2.default.requireValidToken, _authentication2.default.isAdmin, _roles2.default.createRole).get(_authentication2.default.requireValidToken, _authentication2.default.isAdmin, _roles2.default.fetchRoles);

router.route('/:id').get(_authentication2.default.requireValidToken, _authentication2.default.isAdmin, _roles2.default.getRole).put(_authentication2.default.requireValidToken, _authentication2.default.isAdmin, _roles2.default.updateRole).delete(_authentication2.default.requireValidToken, _authentication2.default.isAdmin, _roles2.default.deleteRole);

exports.default = router;