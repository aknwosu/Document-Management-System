import jwt from 'jsonwebtoken';
import db from '../models';

const secret = process.env.SECRET_TOKEN || 'myverygoodbadtkey';

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
        console.log(err);
        return res.status(401).send({
          success: false,
          message: 'Invalid token.'
        });
      }
      req.decoded = decoded;
      next();
    });
  },

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

  isOwnerOrAdmin(req, res, next) {
    db.Users.findById(req.decoded.userId).then((user) => {
      if ((user.roleId === 1)
      || (parseInt(user.id, 10) === parseInt(req.params.id, 10))) {
        next();
      } else {
        return res.status(403).send({ message: 'You are not allowed in here' });
      }
    });
  }
};

export default Authentication;
