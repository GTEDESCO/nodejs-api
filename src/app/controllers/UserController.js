import User from '../models/User';
import { storeSchema } from '../validators/User';

class UserController {
  async store(req, res) {
    if (!(await storeSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos faltando!' });
    }

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
