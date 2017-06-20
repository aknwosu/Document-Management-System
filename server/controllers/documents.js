import db from '../models';
import Paginator from '../helpers/pagination';

/**
 * Class for handling document operations
 */
class DocumentController {

  /**
   * Create Document
   *
   * @param {object} req being sent
   * @param {object} res containing response
   * @returns{object} response object
   */
  static createDocument(req, res) {
    const newDoc = {
      title: req.body.title,
      content: req.body.content,
      access: req.body.access,
      userId: req.decoded.userId
    };
    db.Documents.find({
      where: { title: req.body.title }
    })
    .then((docExists) => {
      if (docExists) {
        return res.status(409)
          .send({ message: 'please enter a different title' });
      }
    });
    if (!newDoc.title) {
      return res.status(400).send({ messsage: 'please enter a title' });
    }
    if (!newDoc.content) {
      return res.status(400).send({ messsage: 'please enter a text' });
    }
    db.Documents.create(newDoc)
      .then((document) => {
        res.status(201).json({
          message: 'Document created',
          document
        });
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        });
      });
  }

  /**
   * Method to get documents
   * @param {object} req request being sent
   * @param {object} res response containing object
   * @returns{object} response object
   */
  static getDocuments(req, res) {
    const query = {};
    query.limit = (req.query.limit > 0) ? req.query.limit : 20;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    if (req.userType === 'admin') {
      query.where = {};
    } else if (req.userType === 'user') {
      query.include = [{ model: db.Users, attributes: ['id'] }];
      query.where =
        db.sequelize.or(
          { userId: req.decoded.userId },
          { access: 'public' },
          db.sequelize.and(
            { access: 'role' },
            db.sequelize
            .where(db.sequelize.col('User.roleId'), '=', req.decoded.roleId)
          )
        );
    }
    db.Documents.findAndCountAll(query)
    .then((documents) => {
      const metaData = {
        count: documents.count,
        limit: query.limit,
        offset: query.offset
      };
      delete documents.count;
      const pageData = Paginator.paginate(metaData);
      res.status(200).json({
        msg: 'Documents found',
        documents,
        pageData
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
  static findDocument(req, res) {
    db.Documents.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((document) => {
        if (document) {
          if (req.decoded.userId === document.userId
          || req.userType === 'admin' || document.access === 'public') {
            res.status(200).send({
              message: 'Document found',
              document
            });
          } else {
            res.status(403).send({ message: 'private document' });
          }
        } else {
          return res.status(404).send({ message: 'Not found' });
        }
      }).catch((err) => {
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
  static updateDocument(req, res) {
    db.Documents.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((document) => {
        if (!document) {
          return res.status(404).send({ message: 'Not found' });
        }
        document.title = req.body.title;
        document.content = req.body.content;
        document.save().then(() => {
          res.status(200).json({
            msg: 'Document updated'
          });
        }).catch((err) => {
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
  static deleteDocument(req, res) {
    db.Documents.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            msg: `Document ${req.params.id} not found`
          });
        }
        db.Documents.destroy({
          where: {
            id: req.params.id
          }
        })
          .then(() => {
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
  static searchDocument(req, res) {
    if (req.query.q) {
      db.Documents.findAll({
        where: {
          access: 'public',
          $or: [{
            title: {
              $iLike: `%${req.query.q}%`
            }
          }]
        }
      }).then((document) => {
        res.status(200).json({
          message: 'Documents found',
          docs: document
        });
      });
    } else {
      res.status(404).json({
        message: 'Provide a valid query'
      });
    }
  }
}

export default DocumentController;
