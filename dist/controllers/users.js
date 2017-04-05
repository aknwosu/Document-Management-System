'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _pagination = require('../helpers/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var secret = process.env.SECRET_TOKEN || 'myverygoodbadtkey';

var userDetails = function userDetails(user) {
  var fields = {
    id: user.id,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    roleId: user.roleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
  return fields;
};
var userAttributes = ['id', 'username', 'firstname', 'lastname', 'email', 'roleId', 'createdAt', 'updatedAt'];

/**
 * User Controller class
 *
 * @param {object} req
 * @param {object} res
 * @returns{object} response object
 */

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'login',


    /**
     * User Login
     * Route: POST: /users/login
     * @param {object} req
     * @param {object} res
     * @returns{object} response object
     */
    value: function login(req, res) {
      _models2.default.Users.findOne({ where: { email: req.body.email } }).then(function (user) {
        if (_bcryptNodejs2.default.compareSync(req.body.password, user.password)) {
          var token = _jsonwebtoken2.default.sign({
            userId: user.id,
            roleId: user.roleId
          }, secret, { expiresIn: '2 days' });
          return res.status(200).send({ message: 'Logged in',
            user: userDetails(user),
            token: token,
            expiresIn: '2 days' });
        }
        return res.status(400).send({ message: 'Invalid username or password' });
      });
    }
    /**
     * User Logout
     * Route: POST: /users/logout
     * @param {object} req
     * @param {object} res
     * @returns {object} response object
     */

  }, {
    key: 'logout',
    value: function logout(req, res) {
      return res.status(201).send({ message: 'Logged out' });
    }

    /**
     *  Create user class
     *
     * @param {object} req
     * @param {object} res
     * @returns{object} response object
     */

  }, {
    key: 'createUser',
    value: function createUser(req, res) {
      if (req.body.roleId) {
        return res.status(403).send({ message: 'you can not decide your roleId' });
      }
      _models2.default.Users.findOne({ where: { email: req.body.email } || { username: req.body.username } }).then(function (userExists) {
        if (userExists) {
          return res.status(409).send({ message: 'User already exists' });
        }
      });
      var newUser = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        email: req.body.email
      };
      _models2.default.Users.create(newUser).then(function (user) {
        var token = _jsonwebtoken2.default.sign({
          userId: user.id,
          roleId: user.roleId
        }, secret, { expiresIn: '5 days' });
        return res.status(201).send({
          message: user.username + ' created',
          user: userDetails(user),
          token: token });
      }).catch(function (err) {
        return res.status(400).send({ message: err.message });
      });
    }

    /**
     *  Create user method
     *
     * @param {object} req request being sent
     * @param {object} res object containing response
     * @returns{object} response object
     */

  }, {
    key: 'createAdminUser',
    value: function createAdminUser(req, res) {
      _models2.default.Users.findOne({ where: { email: req.body.email } || { username: req.body.username } }).then(function (userExists) {
        if (userExists) {
          return res.status(409).send({ message: 'User already exists' });
        }
      });
      var newUser = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        email: req.body.email,
        roleId: 1
      };
      _models2.default.Users.create(newUser).then(function (user) {
        var token = _jsonwebtoken2.default.sign({
          userId: user.id,
          roleId: user.roleId
        }, secret, { expiresIn: '5 days' });

        return res.status(201).send({
          message: user.username + ' created',
          user: userDetails(user),
          token: token });
      }).catch(function (err) {
        res.status(400).json({ message: err.message });
      });
    }

    /**
     *  Find user method
     *
     * @param {object} req request being sent
     * @param {object} res object containing response
     * @returns{object} response object
     */

  }, {
    key: 'findUser',
    value: function findUser(req, res) {
      _models2.default.Users.findOne({ where: { id: req.params.id },
        attributes: userAttributes }).then(function (user) {
        if (user) {
          return res.status(200).json({ message: user });
        }
        return res.status(404).send({ message: 'Not found' });
      }).catch(function (err) {
        res.status(500).send({ message: err.message });
      });
    }

    /**
     *  Get users method
     *
     * @param {object} req request being sent
     * @param {object} res object containing response
     * @returns{object} response object
     */

  }, {
    key: 'getUsers',
    value: function getUsers(req, res) {
      var query = {};
      query.limit = req.query.limit > 0 ? req.query.limit : 10;
      query.offset = req.query.offset > 0 ? req.query.offset : 0;
      if (req.userType === 'admin') {
        query.attributes = userAttributes;
      } else if (req.userType === 'user') {
        query.attributes = ['id', 'username'];
      }
      _models2.default.Users.findAndCountAll(query).then(function (users) {
        var metaData = {
          count: users.count,
          limit: query.limit,
          offset: query.offset
        };
        delete users.count;
        var pageData = _pagination2.default.paginate(metaData);
        return res.status(200).json({
          users: users,
          pageData: pageData });
      });
    }

    /**
     *  Update user method
     *
     * @param {object} req request being sent
     * @param {object} res object containing response
     * @returns{object} response object
     */

  }, {
    key: 'updateUser',
    value: function updateUser(req, res) {
      _models2.default.Users.findOne({ where: { id: req.params.id } }).then(function (user) {
        if (!user) {
          return res.status(404).send({ message: 'Not found' });
        }
        var allowedFields = ['firstname', 'lastname', 'password'];

        allowedFields.forEach(function (field) {
          user[field] = req.body[field] ? req.body[field] : user[field];
        });

        user.save().then(function () {
          res.status(200).send({ message: userDetails(user) });
        });
      }).catch(function (err) {
        res.status(500).send({ message: err.message });
      });
    }

    /**
     * Delete a User
     * @param {object} req request being sent
     * @param {object} res object containing response
     * @returns{object} response object
     */

  }, {
    key: 'deleteUser',
    value: function deleteUser(req, res) {
      _models2.default.Users.findOne({ where: { id: req.params.id } }).then(function (user) {
        if (!user) {
          return res.status(404).send({ message: 'User ' + req.params.id + ' not found' });
        }
        _models2.default.Users.destroy({ where: { id: req.params.id } }).then(function () {
          res.status(204).send({ message: 'User deleted' });
        });
      });
    }

    /**
     * Get a User's documents
     *
     * @param {object} req request being sent
     * @param {object} res object containing response
     * @returns{object} response object
     */

  }, {
    key: 'getUserDocuments',
    value: function getUserDocuments(req, res) {
      _models2.default.Users.findOne({ where: { id: req.params.id } }).then(function (user) {
        user.getDocuments().then(function (documents) {
          res.status(200).json({ message: documents });
        });
      }).catch(function (err) {
        res.status(404).json({ message: err.message });
      });
    }

    /**
     * Search for a user
     *
     * @param {object} req request being sent
     * @param {object} res object containing response
     * @returns{object} response object
     */

  }, {
    key: 'searchUser',
    value: function searchUser(req, res) {
      if (req.query.q) {
        _models2.default.Users.findOne({
          where: {
            username: {
              $iLike: '%' + req.query.q + '%'
            }
          }
        }).then(function (user) {
          res.status(200).json({ message: user });
        });
      } else {
        return res.status(404).json({ error: 'Provide a query' });
      }
    }
  }]);

  return UserController;
}();

exports.default = UserController;