'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _pagination = require('../helpers/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class for handling document operations
 */
var DocumentController = function () {
  function DocumentController() {
    _classCallCheck(this, DocumentController);
  }

  _createClass(DocumentController, null, [{
    key: 'createDocument',


    /**
     * Create Document
     *
     * @param {object} req being sent
     * @param {object} res containing response
     * @returns{object} response object
     */
    value: function createDocument(req, res) {
      var newDoc = {
        title: req.body.title,
        content: req.body.content,
        access: req.body.access,
        userId: req.body.userId
      };
      _models2.default.Documents.create(newDoc).then(function (document) {
        res.status(201).json({
          msg: 'Document created',
          document: document
        });
      }).catch(function (err) {
        res.status(400).json({
          msg: err.message
        });
      });
    }

    /**
     * Method to get documents
     * @param {object} req request being sent
     * @param {object} res response containing object
     * @returns{object} response object
     */

  }, {
    key: 'getDocuments',
    value: function getDocuments(req, res) {
      var query = {};
      query.limit = req.query.limit > 0 ? req.query.limit : 10;
      query.offset = req.query.offset > 0 ? req.query.offset : 0;
      if (req.userType === 'admin') {
        query.where = {};
      } else if (req.userType === 'user') {
        query.include = [{ model: _models2.default.Users }];
        query.where = _models2.default.sequelize.or({ userId: req.decoded.userId }, { access: 'public' }, _models2.default.sequelize.and({ access: 'role' }, _models2.default.sequelize.where(_models2.default.sequelize.col('User.roleId'), '=', req.decoded.roleId)));
      }
      _models2.default.Documents.findAndCountAll(query).then(function (documents) {
        var metaData = {
          count: documents.count,
          limit: query.limit,
          offset: query.offset
        };
        delete documents.count;
        var pageData = _pagination2.default.paginate(metaData);
        res.status(200).json({
          msg: 'Document found',
          documents: documents,
          pageData: pageData
        });
      });
    }
    /**
     * Method to find documents
     *
     * @param {object} req being sent
     * @param {object} res containing response
     * @returns{object} response object
     */

  }, {
    key: 'findDocument',
    value: function findDocument(req, res) {
      _models2.default.Documents.findOne({
        where: {
          id: req.params.id
        }
      }).then(function (document) {
        if (document) {
          if (req.decoded.userId === document.userId || req.userType === 'admin' || document.access === 'public') {
            res.status(200).send({
              message: 'Document found',
              document: document
            });
          } else {
            res.status(403).send({ message: 'private document' });
          }
        } else {
          return res.status(404).send({ message: 'Not found' });
        }
      }).catch(function (err) {
        res.status(400).json({
          msg: err.message
        });
      });
    }

    /**
     * Method to update documents
     *
     * @param {object} req being sent
     * @param {object} res containing response
     * @returns{object} response object
     */

  }, {
    key: 'updateDocument',
    value: function updateDocument(req, res) {
      _models2.default.Documents.findOne({
        where: {
          id: req.params.id
        }
      }).then(function (document) {
        if (!document) {
          return res.status(404).send({ message: 'Not found' });
        }
        document.title = req.body.title;
        document.content = req.body.content;
        document.save().then(function () {
          res.status(200).json({
            msg: 'Document updated'
          });
        }).catch(function (err) {
          res.status(400).json({
            error: err.message
          });
        });
      });
    }

    /**
     * Method to delete documents
     *
     * @param {object} req being sent
     * @param {object} res containing response
     * @returns{object} response object
     */

  }, {
    key: 'deleteDocument',
    value: function deleteDocument(req, res) {
      _models2.default.Documents.findOne({
        where: {
          id: req.params.id
        }
      }).then(function (document) {
        if (!document) {
          return res.status(404).send({
            msg: 'Document ' + req.params.id + ' not found'
          });
        }
        _models2.default.Documents.destroy({
          where: {
            id: req.params.id
          }
        }).then(function () {
          res.status(200).send({
            msg: 'Document deleted'
          });
        });
      });
    }

    /**
     * Method to search documents
     *
     * @param {object} req being sent
     * @param {object} res containing response
     * @returns{object} response object
     */

  }, {
    key: 'searchDocument',
    value: function searchDocument(req, res) {
      if (req.query.q) {
        _models2.default.Documents.findAll({
          where: {
            access: 'public',
            $or: [{
              title: {
                $iLike: '%' + req.query.q + '%'
              }
            }]
          }
        }).then(function (document) {
          res.status(200).json({
            docs: document
          });
        });
      } else {
        res.status(404).json({
          message: 'Provide a valid query'
        });
      }
    }
  }]);

  return DocumentController;
}();

exports.default = DocumentController;