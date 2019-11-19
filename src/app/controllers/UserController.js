import { User } from '../models';

class UserController {
  async index(req, res) {
    const { page } = req.params;
    const { pageSize, email } = req.query;

    const opts = {};

    if (page) {
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
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    return res.json(user);
  }

  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ message: 'Usuário ja existente!' });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }

  async update(req, res) {
    req.userId = 1;
    const { id } = req.params;
    const { email } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Usuário não encontrado no sistema!' });
    }

    if (user.id !== parseInt(id, 10) && user.email === email) {
      return res.status(400).json({ message: 'Usuário ja existente!' });
    }

    await User.update(req.body, {
      where: { id },
    });

    return res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;

    await User.destroy({ where: { id } });

    return res.send();
  }
}

export default new UserController();
