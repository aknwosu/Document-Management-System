import db from '../models';

/**
 * Role Controller class
 */
class RoleController {
  /**
   * Post Role
   * @param {*} req
   * @param {*} res
   * @returns{void}
   */
  static createRole(req, res) {
    db.Roles.create(req.body)
    .then((role) => {
      res.status(201).send({ message: 'role created successfully', role });
    })
    .catch((err) => {
      res.status.send(err);
    });
  }

  /**
   * Update a role
   * @param {*} req
   * @param {*} res
   * @returns{Response} response object
   */
  static updateRole(req, res) {
    db.Roles.findOne({ where: { id: req.params.id } })
    .then((role) => {
      if (!role) {
        return res.status(404).send({ message: 'Not found' });
      }
      role.update(req.body)
      .then((updatedRole) => {
        res.status(200).send({ message: 'Role updated successfully', updatedRole })
      });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
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
      if (role) {
        db.Roles.destroy()
        .then(() => {
          res.status(200).send({ message: 'role deleted successfully' })
        });
      }
    }).catch((error) => {
      res.status(404).send({ message: error });
    });
  }
}
export default RoleController;
