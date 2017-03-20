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
    db.Roles.create(request.body)
      .then((createdRole) => {
        response.status(201)
          .json(createdRole);
      })
      .catch((error) => {
        response.status(400)
          .send({ message: error });
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
        res.status(200).json(updatedRole);
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
