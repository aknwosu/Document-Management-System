'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Role Controller class
 */
var RoleController = function () {
  function RoleController() {
    _classCallCheck(this, RoleController);
  }

  _createClass(RoleController, null, [{
    key: 'createRole',

    /**
     * Post Role
     *
     * @param {object} request being sent
     * @param {object} response containing response
     * @returns{object} response object
     */
    value: function createRole(request, response) {
      _models2.default.Roles.findOne({
        where: {
          title: request.body.title
        }
      }).then(function (role) {
        if (role) {
          return response.status(400).send({
            message: 'Role already exists'
          });
        }
        _models2.default.Roles.create(request.body).then(function (createdRole) {
          response.status(201).json(createdRole);
        }).catch(function (error) {
          response.status(400).send({
            message: error
          });
        });
      });
    }

    /**
     * Update a role
     *
     * @param {object} req being sent
     * @param {object} res containing response
     * @returns{object} response object
     */

  }, {
    key: 'updateRole',
    value: function updateRole(req, res) {
      _models2.default.Roles.findOne({
        where: {
          title: req.body.title
        }
      }).then(function (roleExists) {
        if (roleExists) {
          return res.status(400).send({
            message: 'Role already exists'
          });
        }
        _models2.default.Roles.findOne({
          where: {
            id: req.params.id
          }
        }).then(function (role) {
          role.update(req.body).then(function (updatedRole) {
            res.status(200).json(updatedRole);
          });
        }).catch(function (err) {
          res.status(400).send({
            message: err
          });
        });
      });
    }
    /**
     * Get a role
     *
     * @param {object} req being sent
     * @param {object} res containing response
     * @returns{object} response object
     */

  }, {
    key: 'getRole',
    value: function getRole(req, res) {
      _models2.default.Roles.findOne({
        where: {
          id: req.params.id
        }
      }).then(function (role) {
        if (!role) {
          return res.status(404).send({
            message: 'Not found'
          });
        }
        if (role) {
          return res.status(200).send({
            role: role
          });
        }
      });
    }
    /**
     * Fetch a role
     *
     * @param {object} req being sent
     * @param {object} res containing response
     * @returns{object} response object
     */

  }, {
    key: 'fetchRoles',
    value: function fetchRoles(req, res) {
      _models2.default.Roles.findAll().then(function (roles) {
        res.status(200).send(roles);
      });
    }

    /**
     * Delete a role
     *
     * @param {object} req being sent
     * @param {object} res containing response
     * @returns{object} response object
     */

  }, {
    key: 'deleteRole',
    value: function deleteRole(req, res) {
      _models2.default.Roles.findOne({
        where: {
          id: req.params.id
        }
      }).then(function (role) {
        if (role.title === 'admin') {
          return res.status(403).send({
            message: 'You cannot delete the admin role'
          });
        }
        if (role) {
          role.destroy().then(function () {
            res.status(200).json({
              message: 'role deleted successfully'
            });
          });
        }
      }).catch(function (error) {
        res.status(404).send({
          message: error
        });
      });
    }
  }]);

  return RoleController;
}();

exports.default = RoleController;