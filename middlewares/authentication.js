import jwt from 'jsonwebtoken';

import db from '../models';

const secret = process.env.SECRET_TOKEN || 'myverygoodbadtkey';

const Authentication = {
  requireValidToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({
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

  isAdmin(req, res, next) {
    db.Users.findById(req.decoded.id).then((user) => {
      db.Roles.findById(user.roleId).then((role) => {
        if (role.name === 'admin') {
          next();
        } else {
          return res.status(401).send({
            success: false,
            message: 'You need to be an admin to view use this resource.' });
        }
      });
    });
  }
};

export default Authentication;
