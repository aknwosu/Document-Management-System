import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import db from '../models';

const secret = process.env.SECRET_TOKEN || 'myverygoodbadtkey';

/**
 *
 * @param {object} user
 * @param {object} res
 * @returns{object} response object
 */
const userDetails = (user) => {
  const fields = {
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

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns{object} response object
 */
class UserController {

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns{object} response object
 */
  static login(req, res) {
    db.Users.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({
          id: req.body.id,
          roleId: req.body.roleId
        }, secret, { expiresIn: '120m' });
        res.status(200).json({ msg: 'Logged in', user, token });
      } else {
        res.status(500).json({ error: 'Invalid' });
      }
    });
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  static logout(req, res) {
    res.status(201).json({ msg: 'Logged out' });
  }

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns{object} response object
 */
  static createUser(req, res) {
    const newUser = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      email: req.body.email,
      roleId: 1
    };
    db.Users.create(newUser)
      .then((user) => {
        const token = jwt.sign({
          id: user.id,
          roleId: user.roleId
        }, secret, { expiresIn: '5days' });

        res.status(201).json({
          msg: 'Created',
          user: {
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            roleId: user.roleId,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt },
          token });
      }).catch((err) => {
        res.status(500).json({ msg: err.message });
      });
  }

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns{object} response object
 */
  static getUser(req, res) {
    db.Users.findAll().then((users) => {
      res.status(200).json({ msg: users });
    }).catch((err) => {
      res.status(500).json({ msg: err.message });
    });
  }

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns{object} response object
 */
  static findUser(req, res) {
    db.Users.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user) {
        res.status(200).json({ msg: user });
      } else {
        res.status(500).json({ error: 'User does not exist in the database' });
      }
    }).catch((err) => {
      res.status(500).json({ msg: err.message });
    });
  }

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns{object} response object
 */
  static updateUser(req, res) {
    db.Users.findOne({ where: { id: req.params.id } })
    .then((user) => {
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.password = req.body.password;
      user.save().then(() => {
        res.status(200).json({ msg: 'User updated' });
      }).catch((err) => {
        res.status(500).json({ error: err.message });
      });
    });
  }

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns{object} response object
 */
  static deleteUser(req, res) {
    db.Users.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
          res.status(200).json({ msg: `User ${req.params.id} not found` });
        }
        db.Users.destroy({ where: { id: req.params.id } })
          .then(() => {
            res.status(201).json({ msg: 'User deleted' });
          });
      });
  }

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
  static getUserDocument(req, res) {
    db.Users.findOne({ where: { id: req.params.id } })
   .then((user) => {
     user.getDocuments().then((documents) => {
       res.status(200).json({ msg: documents });
     });
   })
   .catch((err) => {
     res.status(404).json({ msg: err.message });
   });
  }

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns{object} response object
 */
  static searchUser(req, res) {
    if (req.query.q) {
      db.Users.findOne({
        where: {
          username: {
            $iLike: `%${req.query.q}%`
          }
        }
      }).then((user) => {
        res.status(200).json({ user });
      }).catch((err) => {
        res.status(500).json({ error: err });
      });
    } else {
      res.status(404).json({ error: 'Provide a query' });
    }
  }
}

export default UserController;

