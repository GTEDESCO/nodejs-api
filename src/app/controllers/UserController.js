import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = User.findAll();

    return res.json(users);
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

    const user = await User.findByPk(id);

    return res.json(user);
  }
}

export default new UserController();
