import { Op } from 'sequelize';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const { page } = req.params;
    const { pageSize, email } = req.query;

    const opts = {};

    if (page && pageSize) {
      opts.offset = (parseInt(page, 10) - 1) * (pageSize || 10);
      opts.limit = pageSize || 10;
    }

    opts.where = {};

    if (email) {
      opts.where = {
        ...opts.where,
        email,
      };
    }

    const users = await User.findAndCountAll(opts);

    return res.json({
      page: parseInt(page, 10) || null,
      size: pageSize || (page ? 10 : null),
      totalPages: Math.ceil(users.count / (pageSize || 10)),
      totalElements: users.count,
      docs: users.rows,
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    return res.json(user);
  }

  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Usuário ja existente!' });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }

  async update(req, res) {
    const { id } = req.params;
    const { email } = req.body;

    if (email) {
      const userExists = await User.findOne({
        where: { email, id: { [Op.ne]: id } },
      });

      if (userExists) {
        return res.status(400).json({ error: 'Usuário ja existente!' });
      }
    }

    await User.update(req.body, {
      where: { id },
    });

    const user = await User.findByPk(id);

    return res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;

    await User.destroy({ where: { id } });

    return res.send();
  }
}

export default new UserController();
