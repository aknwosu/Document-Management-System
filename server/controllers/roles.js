import db from '../models';

/**
 * Role Controller class
 */
class RoleController {
  /**
   * Post Role
   * @param {*} request
   * @param {*} response
   * @returns{void}
   */
  static createRole(request, response) {
    db.Roles.findOne({ where: { title: request.body.title } })
    .then((role) => {
      if (role) {
        return response.status(400).send({ message: 'Role already exists' });
      }
      db.Roles.create(request.body)
        .then((createdRole) => {
          response.status(201)
            .json(createdRole);
        })
        .catch((error) => {
          response.status(400)
            .send({ message: error });
        });
    });
  }

  /**
   * Update a role
   * @param {*} req
   * @param {*} res
   * @returns{Response} response object
   */
  static updateRole(req, res) {
    db.Roles.findOne({ where: { title: req.body.title } })
    .then((roleExists) => {
      if (roleExists) {
        return res.status(400).send({ message: 'Role already exists' });
      }
    db.Roles.findOne({ where: { id: req.params.id } })
    .then((role) => {
      role.update(req.body)
      .then((updatedRole) => {
        res.status(200).json(updatedRole);
      });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
     });
  }

  static getRole(req, res) {
    db.Roles.findOne({ where: { id: req.params.id } })
    .then((role) => {
      if (!role) {
        return res.status(404).send({ message: 'Not found' });
      }
      if (role) {
        return res.status(200).send({ role });
      }
    });
  }
  /**
   * Fetch roles
   * @param {*} req
   * @param {*} res
   */
  static fetchRoles(req, res) {
    db.Roles.findAll()
    .then((roles) => {
      res.status(200).send(roles);
    });
  }

  /**
   * Delete role
   * @param {*} req 
   * @param {*} res 
   */
  static deleteRole(req, res) {
    db.Roles.findOne({ where: { id: req.params.id } })
    .then((role) => {
      if (role.title === 'admin'){
        return res.status(403).send({ message: 'You cannot delete the admin role'});
      }
      if (role) {
        role.destroy()
        .then(() => {
          res.status(200).json({ message: 'role deleted successfully' });
        });
      }
    }).catch((error) => {
      res.status(404).send({ message: error });
    });
  }
}
export default RoleController;
