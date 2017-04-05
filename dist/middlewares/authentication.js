'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = process.env.SECRET_TOKEN || 'myverygoodbadtkey';

/**
  * Method to decode and verify token
  *
  * @param {Object} req
  * @param {Object} res
  * @param {Object} next
  * @returns {Object} res object
  */
var Authentication = {
  requireValidToken: function requireValidToken(req, res, next) {
    var token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
    _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Invalid token.'
        });
      }
      req.decoded = decoded;
      next();
    });
  },

  /**
    * Method to and verify if a user is an admin
    *
    * @param {Object} req
    * @param {Object} res
    * @param {Object} next
    * @returns {Object} res object
    */
  isAdmin: function isAdmin(req, res, next) {
    _models2.default.Roles.findById(req.decoded.roleId).then(function (role) {
      if (role.title === 'admin') {
        next();
      } else {
        return res.status(403).send({
          success: false,
          message: 'You need to be an admin to use this resource.' });
      }
    });
  },


  /**
    * Method to verify a supplied token
    *
    * @param {Object} req
    * @param {Object} res
    * @param {Object} next
    * @returns {Object} res object
    */
  validUser: function validUser(req, res, next) {
    _models2.default.Users.findById(req.decoded.userId).then(function (user) {
      _models2.default.Roles.findById(user.roleId).then(function (role) {
        if (role.title === 'admin') {
          req.userType = 'admin';
          next();
        } else {
          req.userType = 'user';
          next();
        }
      });
    });
  },


  /**
    * Method to verify if a resource belongs to the token being supplied
    *
    * @param {Object} req
    * @param {Object} res
    * @param {Object} next
    * @returns {Object} res object
    */
  isOwnerOrAdmin: function isOwnerOrAdmin(req, res, next) {
    _models2.default.Users.findById(req.decoded.userId).then(function (user) {
      if (user.roleId === 1 || parseInt(user.id, 10) === parseInt(req.params.id, 10)) {
        next();
      } else {
        return res.status(403).send({ message: 'You are not allowed in here' });
      }
    });
  }
};

exports.default = Authentication;