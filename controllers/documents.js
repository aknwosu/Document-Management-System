import db from '../models';
// const Documents =
// const Users = db.Users;
// const Documents = db.Documents;

// const documentDetails = (document) => {
//   const fields = {
//     title: document.title,
//     content: document.content,
//     accessType: document.accessType,
//     userId: document.userId
//   };
//   return fields;
// };

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
      accessType: req.body.accessType,
      userId: req.body.userId
    };
    db.Documents.create(newDoc)
      .then((document) => {
        res.status(200).json({
          msg: 'Document created',
          document
        });
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
  static getDocument(req, res) {
    db.Documents.findAll().then((documents) => {
      res.status(200).json({
        msg: 'Document found',
        documents
      });
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
  static findDocument(req, res) {
    db.Documents.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((document) => {
        res.status(200).send({
          msg: 'Document found',
          document
        });
      }).catch((err) => {
        res.status(500).send({
          error: err.message
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
          res.status(200).send({
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
      db.Documents.findOne({
        where: {
          title: {
            $iLike: `%${req.query.q}%`
          }
        }
      }).then((document) => {
        res.status(200).json({
          docs: document
        });
      }).catch((err) => {
        res.status(500).json({
          error: err.message
        });
      });
    } else {
      res.status(404).json({
        error: 'Provide a query'
      });
    }
  }
}

export default DocumentController;
