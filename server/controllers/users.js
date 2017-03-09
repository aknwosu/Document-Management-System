var db = require('../models');
var bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_TOKEN || 'myverygoodbadtkey';

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

// const createToken = user => jwt.sign({
//   id: user.id,
//   email: user.email,
// }, secret, { expiresIn: '120m' });

// const createToken = (user) => {
//   jwt.sign({
//     id: user.id,
//     roleId: user.roleId
//   }, secret, { expiresIn: '120m' });
// };

class UserController {


  static login(req, res) {
    db.Users.findOne({ where: { email: req.body.email } })
    .then((user) => {
     // var hash = bcrypt.hashSync(req.body.password);
      
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json({ msg: 'Logged in' });
      } else {
        res.status(500).json({ error: 'Invalid' });
      }
    });
  }

  static logout(req, res) {


    res.status(201).json({ msg: 'Logged out' });

  }

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
        }, secret, { expiresIn: '120m' });

        res.status(201).json({ msg: 'Created', user, token });
        console.log(token);
      // const token = createToken(user).then(() => {
        
      // });
      // res.status(201).json({ msg: 'Created', token, user });
    }).catch((err) => {
      res.status(500).json({ msg: err.message });
    });


  }

  static getUser(req, res) {
    db.Users.findAll().then((users) => {
      res.status(200).json({ msg: users });
    }).catch((err) => {
      res.status(500).json({ msg: err.message });
    });
  }

  static findUser(req, res) {
    db.Users.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user) {
        res.status(200).json({ msg: user });
      } else {
        res.status(500).json({ error: "User does not exist in the database"});
      }
    }).catch((err) => {
      res.status(500).json({ msg: err.message });
    });
  }

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

  static deleteUser(req, res) {
    db.Users.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
          res.status(200).json({ msg: `User ${req.params.id} not found` });
        }
        db.Users.destroy({ where: { id: req.params.id } })
          .then((user) => {
            res.status(201).json({ msg: 'User deleted' });
          });
      });
  }


  static userDoc(req, res) {
    res.status(201).json({ msg: 'User document found' });
  }
}

module.exports = UserController;











// const jwt = require('jsonwebtoken');
// let db = require('../models');
// const secret = process.env.SECRET_TOKEN || 'myverygoodbadtkey';

// const userDetails = (user) => {
//   const fields = {
//     id: user.id,
//     username: user.username,
//     firstname: user.firstname,
//     lastname: user.lastname,
//     email: user.email,
//     roleId: user.roleId,
//     createdAt: user.createdAt,
//     updatedAt: user.updatedAt
//   };
//   return fields;
// };

// /**
//  * UserControllers
//  */

// class UserController {
//  /**
//  * @param {object} req
//  * @param {object} res
//  * @returns{void}
//  */
//   static login(req, res) {
//     db.Users.findOne({ where: { email: req.body.email } })
//     .then((user) => {
//       if(user && validPassword(req.body.password)){
//         const token = jwt.sign({
//           UserId: user.id,
//           RoleId: role.id
//         }, secret, {expiresIn: '2 days' });
//         res.send({ token, expiresIn: '2 days' });
//       } else {
//         res.status(401)
//         .send({message: 'Authentication failed. Invalid username or password'});
//        }
//     });
//   }
  
// /**
//  * @param {object} req
//  * @param {object} res
//  * @returns{void}
//  */
// static logout(req, res) {
//   res.send(201)({ message: 'Logged out' });
//   }

// /**
//  * @param {object} req
//  * @param {object} res
//  * @returns{void}
//  */
//   static createUser(req, res) {
//     const newUser = {
//       username: req.body.username,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       password: req.body.password,
//       email: req.body.email,
//       roleId: 1
//     }
//   User.create(newUser).then((user) => {
//     console.log(req.body);
//     res.status(201).json({ msg: 'Created', user: user });
//   });

// }

// }

// module.exports = UserController
