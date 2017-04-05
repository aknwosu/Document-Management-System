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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Route to get and post documents for a user
router.route('/').get(_authentication2.default.requireValidToken, _authentication2.default.validUser, _documents2.default.getDocuments).post(_authentication2.default.requireValidToken, _documents2.default.createDocument);

router.route('/:id').get(_authentication2.default.requireValidToken, _authentication2.default.validUser, _documents2.default.findDocument).put(_authentication2.default.requireValidToken, _authentication2.default.validUser, _documents2.default.updateDocument).delete(_authentication2.default.requireValidToken, _authentication2.default.isAdmin, _documents2.default.deleteDocument);

exports.default = router;