import jwt from 'jsonwebtoken';
import db from '../models';

const secret = process.env.SECRET_TOKEN || 'myverygoodbadtkey';

 /**
   * Method to decode and verify token
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} res object
   */
const Authentication = {
  requireValidToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
    jwt.verify(token, secret, (err, decoded) => {
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
  isAdmin(req, res, next) {
    db.Roles.findById(req.decoded.roleId).then((role) => {
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
  validUser(req, res, next) {
    db.Users.findById(req.decoded.userId).then((user) => {
      db.Roles.findById(user.roleId).then((role) => {
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
  isOwnerOrAdmin(req, res, next) {
    db.Users.findById(req.decoded.userId).then((user) => {
      if ((user.roleId === 1)
      || (parseInt(user.id, 10) === parseInt(req.params.id, 10))) {
        next();
      } else {
        return res.status(401).send({ message: 'You are not allowed in here' });
      }
    });
  }
};

export default Authentication;
