import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import db from '../models';
import Paginator from '../helpers/pagination';


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
const userAttributes = [
  'id',
  'username',
  'firstname',
  'lastname',
  'email',
  'roleId',
  'createdAt',
  'updatedAt'
];

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns{object} response object
 */
class UserController {

/**
 * User Login
 * Route: POST: /users/login
 * @param {object} req
 * @param {object} res
 * @returns{object} response object
 */
  static login(req, res) {
    db.Users.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({
          id: user.id,
          roleId: user.roleId
        }, secret, { expiresIn: '2 days' });
        return res.status(200).send({ message: 'Logged in',
          user: userDetails(user),
          token,
          expiresIn: '2 days' });
      } else {
        return res.status(500).send({ message: 'Invalid username or password' });
      }
    });
  }
  /**
   * User Logout
   * Route: POST: /users/logout
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  static logout(req, res) {
    return res.status(201).send({ message: 'Logged out' });
  }

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns{object} response object
 */
  static createUser(req, res) {
    if (req.body.roleId) {
      return res.status(403).send({ message: 'you can not decide your roleId' });
    }
    db.Users.findOne({ where: { email: req.body.email } || { username: req.body.username } })
    .then((userExists) => {
      if (userExists) {
        return res.status(409)
        .send({ message: 'User already exists' });
      }
    });
    const newUser = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      email: req.body.email,
    };
    db.Users.create(newUser)
      .then((user) => {
        const token = jwt.sign({
          id: user.id,
          roleId: user.roleId
        }, secret, { expiresIn: '5 days' });
        return res.status(201).send({
          message: `${user.username} created`,
          user: userDetails(user),
          token });
      }).catch(err => res.status(400).send({ message: err.message }));
  }

/**
 * 
 */
  static createAdminUser(req, res) {
    db.Users.findOne({ where: { email: req.body.email } || { username: req.body.username }})
    .then((userExists) => {
      if (userExists) {
        return res.status(409)
        .send({ message: 'User already exists' });
      }
    });
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
        }, secret, { expiresIn: '5 days' });

        return res.status(201).send({
          message: `${user.username} created`,
          user: userDetails(user),
          token });
      }).catch((err) => {
        res.status(400).json({ message: err.message });
      });
  }
/**
 *
 * @param {object} req
 * @param {object} res
 * @returns{object} response object
 */
  static findUser(req, res) {
    db.Users.findOne({ where: { id: req.params.id }, attributes: userAttributes })
    .then((user) => {
      if (user) {
        return res.status(200).json({ message: user });
      }
      return res.status(404).send({ message: 'Not found' });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  }

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns{object} response object
 */
  static getUsers(req, res) {
    const query = {};
    query.limit = (req.query.limit > 0) ? req.query.limit : 10;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    if (req.userType === 'admin') {
      query.attributes = userAttributes;
    } else if (req.userType === 'user') {
      query.attributes = ['id', 'username'];
    }
    db.Users.findAndCountAll(query)
    .then((users) => {
      const metaData = {
        count: users.count,
        limit: query.limit,
        offset: query.offset
      };
      delete users.count;
      const pageData = Paginator.paginate(metaData);
      return res.status(200).json({
        users,
        pageData });
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
      if (!user) {
        return res.status(404)
        .send({ message: 'Not found' });
      }
      const allowedFields = ['firstname', 'lastname', 'password'];

      allowedFields.forEach((field) => {
        user[field] = req.body[field] ? req.body[field] : user[field];
      });

      user.save().then(() => {
        res.status(200).send({ message: userDetails(user) });
      });
    }).catch((err) => {
      res.status(500).send({ message: err.message });
    });
  }

/**
 * Deletes a User
 * @param {object} req
 * @param {object} res
 * @returns{object} response object
 */
  static deleteUser(req, res) {
    db.Users.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: `User ${req.params.id} not found` });
        }
        db.Users.destroy({ where: { id: req.params.id } })
          .then(() => {
            res.status(204).send({ message: 'User deleted' });
          });
      });
  }

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
  static getUserDocuments(req, res) {
    db.Users.findOne({ where: { id: req.params.id } })
   .then((user) => {
     user.getDocuments().then((documents) => {
       res.status(200).json({ message: documents });
     });
   })
   .catch((err) => {
     res.status(404).json({ message: err.message });
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
        res.status(200).json({ message: user });
      });
    } else {
      return res.status(404).json({ error: 'Provide a query' });
    }
  }
}

export default UserController;

