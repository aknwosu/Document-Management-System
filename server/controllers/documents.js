import db from '../models';
import Paginator from '../helpers/pagination';

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns{object} response object
 */
class DocumentController {

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns{object} response object
   */
  static createDocument(req, res) {
    const newDoc = {
      title: req.body.title,
      content: req.body.content,
      access: req.body.access,
      userId: req.body.userId
    };
    db.Documents.create(newDoc)
      .then((document) => {
        res.status(201).json({
          msg: 'Document created',
          document
        });
      }).catch((err) => {
        console.log(err);
        res.status(500).json({
          
          msg: err.message
        });
      });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns{object} response object
   */
  static getDocuments(req, res) {
    const query = {};
    query.limit = (req.query.limit > 0) ? req.query.limit : 10;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    if (req.userType === 'admin') {
      query.where = {};
    } else if (req.userType === 'user') {
      query.include = [{ model: db.Users }];
      query.where =
        db.sequelize.or(
          { userId: req.decoded.userId },
          { access: 'public' },
          db.sequelize.and(
            { access: 'role' },
            db.sequelize.where(db.sequelize.col('User.roleId'), '=', req.decoded.roleId)
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
        msg: 'Document found',
        documents,
        pageData
      });
    });
  }
  /**
   *
   * @param {object} req
   * @param {object} res
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
        res.status(500).json({
          msg: err.message
        });
      });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
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
            msg: 'User updated'
          });
        }).catch((err) => {
          res.status(500).json({
            error: err.message
          });
        });
      });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
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
   *
   * @param {object} req
   * @param {object} res
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
